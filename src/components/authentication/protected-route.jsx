"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getUserInfoByToken,
  getEmployeeByUserID,
} from "../../services/employee.dao";

const ALLOWED_POSITIONS = [11, 22, 34, 35, 40]; // Posiciones permitidas

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [employeeData, setEmployeeData] = useState(null);

  //useEffect para debuggear
  useEffect(() => {
    console.log("Session", session);
    console.log("User data", userData);
    console.log("Employee data", employeeData);
    console.log("isAuthorized", isAuthorized);
    console.log("isLoading", isLoading);
  }, [session, userData, employeeData]);

  // 1. Obtener información del usuario por token
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session?.error === "inactive-user") {
          await signOut();
          return;
        }

        if (session) {
          const userInfo = await getUserInfoByToken(session);
          setUserData(userInfo);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        router.push("/unauthorized");
      }
    };

    if (session) fetchUserData();
  }, [session, router]);

  // 2. Verificar si el usuario es empleado
  useEffect(() => {
    if (userData) {
      if (!userData.is_employee) {
        console.error("Solo empleados pueden acceder");
        router.push("/unauthorized");
      }
    }
  }, [userData, router]);

  // 3. Obtener datos del empleado
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (userData && session) {
          const employeeInfo = await getEmployeeByUserID(session, userData.id);
          const employeeDataInfo = {
            first_name: employeeInfo.employee.user.first_name,
            last_name: employeeInfo.employee.user.last_name,
            email: employeeInfo.employee.user.email,
            id_position: employeeInfo.employee.id_position,
          };
          setEmployeeData(employeeDataInfo);
        }
      } catch (error) {
        console.error("Error obteniendo datos del empleado:", error);
        router.push("/unauthorized");
      }
    };

    if (userData && session) fetchEmployeeData();
  }, [userData, session, router]);

  // 4. Verificar posición del empleado
  useEffect(() => {
    if (employeeData) {
      const idPosition = employeeData.id_position;
      if (ALLOWED_POSITIONS.includes(idPosition)) {
        setIsAuthorized(true);
      } else {
        console.error("Acceso denegado: No tiene permisos de administrador");
        router.push("/unauthorized");
      }
      setIsLoading(false);
    }
  }, [employeeData, router]);

  // Mostrar mensaje de carga
  if (isLoading) {
    return <p>Verificando permisos...</p>;
  }

  // Si no está autorizado, no mostrar los hijos
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;