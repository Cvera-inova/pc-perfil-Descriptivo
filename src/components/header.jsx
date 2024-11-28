"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import logo from "@src/assets/images/logotipo-inova.svg";
import Image from "next/image";
import styles from "./Header.module.css";
 
export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState(null);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [activeThirdLevelSubMenu, setActiveThirdLevelSubMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  const navbarItems = [
    {
      id: 1,
      title: "Empresa",
     
      submenu: [
        {
          id: 2,
          title: "Organigramas",
          link: "http://51.222.110.107:3018/empresa/organigramas",
          submenu: [],
        },
        {
          id: 3,
          title: "Extensiones",
          link: "http://51.222.110.107:3002/empresa/extenciones",
          submenu: [],
        },
      ],
    },
    {
      id: 4,
      title: "Gestión de Calidad",
     
      submenu: [
        {
          id: 5,
          title: "Procesos y Políticas GG",
          link: "http://51.222.110.107:3003/gestion/procesosGG",
          submenu: [],
        },
        {
          id: 6,
          title: "Procesos y Políticas Ventas",
          link: "http://51.222.110.107:3004/gestion/procesosVentas",
          submenu: [],
        },
        {
          id: 7,
          title: "Procesos y Políticas TI",
          link: "http://51.222.110.107:3005/gestion/procesosTI",
          submenu: [],
        },
        {
          id: 8,
          title: "Procesos y Políticas Contabilidad",
          link: "http://51.222.110.107:3006/gestion/procesosContabilidad",
          submenu: [],
        },
        {
          id: 9,
          title: "Procesos y Políticas Talento Humano",
          link: "http://51.222.110.107:3007/gestion/procesosTalento",
          submenu: [],
        },
      ],
    },
    {
      id: 10,
      title: "Servicios en Línea a colaborador/a",
     
      submenu: [
        {
          id: 11,
          title: "Inducción General Empresa",
         
          submenu: [],
        },
        {
          id: 12,
          title: "Help Desk",
          link: "http://51.222.110.107:3009/servicios/help-desk",
          submenu: [],
        },
        {
          id: 13,
          title: "Atención al colaborador/a",
          link: "http://51.222.110.107:3010/servicios/atencion-colaborador",
          submenu: [
            {
              id: 14,
              title: "Permisos",
              link: "http://51.222.110.107:3011/servicios/atencion-colaborador/permisos",
              submenu: [],
            },
            {
              id: 15,
              title: "Vacaciones",
              link: "http://51.222.110.107:3012/servicios/atencion-colaborador/vacaciones",
              submenu: [],
            },
            {
              id: 16,
              title: "Horas Extras",
              link: "http://51.222.110.107:3013/servicios/atencion-colaborador/horas-extras",
              submenu: [],
            },
            {
              id: 17,
              title: "Anticipos",
              link: "http://51.222.110.107:3012/servicios/atencion-colaborador/anticipos",
              submenu: [],
            },
            {
              id: 18,
              title: "Préstamos",
              link: "http://51.222.110.107:3015/servicios/atencion-colaborador/prestamos",
              submenu: [],
            },
            {
              id: 19,
              title: "Certificados laborales",
              link: "http://51.222.110.107:3016/servicios/atencion-colaborador/certificados-laborales",
              submenu: [],
            },
            {
              id: 20,
              title: "Perfil descriptivo del Cargo",
              link: "http://51.222.110.107:3017/servicios/atencion-colaborador/perfil-cargo",
              submenu: [],
            },
            {
              id: 21,
              title: "Mi Evaluación",
              link: "http://51.222.110.107:3018/servicios/atencion-colaborador/evaluacion-desempeno",
              submenu: [],
            },
          ],
        },
        {
          id: 22,
          title: "Dynamics",
          link: "http://51.222.110.107:3019/servicios/dynamics",
          submenu: [],
        },
        {
          id: 23,
          title: "Cronograma de pagos",
          link: "http://51.222.110.107:3020/servicios/cronograma-pagos",
          submenu: [],
        },
        {
          id: 24,
          title: "Cronograma teletrabajo",
          link: "http://51.222.110.107:3021/servicios/cronograma-teletrabajo",
          submenu: [],
        },
        {
          id: 25,
          title: "Cronograma Recepción de Facturas",
          link: "http://51.222.110.107:3022/servicios/cronograma-recepcion-facturas",
          submenu: [],
        },
        {
          id: 26,
          title: "Déjanos sugerencias",
          link: "http://51.222.110.107:3023/servicios/sugerencias",
          submenu: [],
        },
        {
          id: 27,
          title: "Denuncias Compliance",
          link: "http://51.222.110.107:3024/servicios/denuncias-compliance",
          submenu: [],
        },
      ],
    },
  ];
 
  // Agregamos la opción "Inicio" al principio del menú
  const mobileNavbarItems = [
    {
      id: 0,
      title: "Inicio",
      link: "http://51.222.110.107:3005/home",
      submenu: [],
    },
    ...navbarItems,
  ];
 
  const isMobile = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  };
 
  const handleMouseEnter = (itemId) => {
    if (!isMobile()) {
      setActiveItem(itemId);
    }
  };
 
  const handleMouseLeave = () => {
    if (!isMobile()) {
      setActiveItem(null);
      setActiveSubMenu(null);
      setActiveThirdLevelSubMenu(null);
    }
  };
 
  const handleMenuClick = (itemId) => {
    if (isMobile()) {
      setActiveItem(activeItem === itemId ? null : itemId);
    }
  };
 
  const handleSubMenuClick = (subItemId) => {
    if (isMobile()) {
      setActiveSubMenu(activeSubMenu === subItemId ? null : subItemId);
    }
  };
 
  const handleThirdLevelMenuClick = (subItemId) => {
    if (isMobile()) {
      setActiveThirdLevelSubMenu(
        activeThirdLevelSubMenu === subItemId ? null : subItemId
      );
    }
  };
 
  const handleClick = (link) => {
    if (link.startsWith("http://") || link.startsWith("https://")) {
      window.location.href = link;
    } else {
      router.push(link);
    }
    setIsMobileMenuOpen(false);
    setActiveItem(null);
    setActiveSubMenu(null);
    setActiveThirdLevelSubMenu(null);
  };
 
  const isActive = (link) => {
    return pathname === link || pathname.startsWith(link);
  };
 
  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveItem(null);
    setActiveSubMenu(null);
    setActiveThirdLevelSubMenu(null);
  };
 
  const renderSubMenu = (submenu, isThirdLevel = false) => (
    <div
      className={`${isThirdLevel ? styles.thirdLevelSubmenu : styles.submenu} ${
        isMobile() &&
        ((isThirdLevel && activeThirdLevelSubMenu) ||
          (!isThirdLevel && activeSubMenu))
          ? styles.show
          : ""
      }`}
    >
      {submenu.map((subItem) => (
        <div
          key={subItem.id}
          className={`${styles.submenuItem} ${
            (isThirdLevel && activeThirdLevelSubMenu === subItem.id) ||
            (!isThirdLevel && activeSubMenu === subItem.id)
              ? styles.active
              : ""
          }`}
          onMouseEnter={() => {
            if (!isMobile()) {
              if (isThirdLevel) {
                setActiveThirdLevelSubMenu(subItem.id);
              } else {
                setActiveSubMenu(subItem.id);
              }
            }
          }}
          onMouseLeave={() => {
            if (!isMobile()) {
              if (isThirdLevel) {
                setActiveThirdLevelSubMenu(null);
              } else {
                setActiveSubMenu(null);
              }
            }
          }}
        >
          <a
            href="#"
            className={`${styles.submenuLink} ${
              isActive(subItem.link) ? styles.submenuLinkActive : ""
            }`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(subItem.link);
              if (isMobile() && subItem.submenu.length > 0) {
                if (isThirdLevel) {
                  handleThirdLevelMenuClick(subItem.id);
                } else {
                  handleSubMenuClick(subItem.id);
                }
              }
            }}
          >
            {subItem.title}
          </a>
          {subItem.submenu.length > 0 &&
            ((isMobile() &&
              ((isThirdLevel && activeThirdLevelSubMenu === subItem.id) ||
                (!isThirdLevel && activeSubMenu === subItem.id))) ||
              (!isMobile() &&
                ((isThirdLevel && activeThirdLevelSubMenu === subItem.id) ||
                  (!isThirdLevel && activeSubMenu === subItem.id)))) &&
            renderSubMenu(subItem.submenu, true)}
        </div>
      ))}
    </div>
  );
 
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile()) {
        setIsMobileMenuOpen(false);
        setActiveItem(null);
        setActiveSubMenu(null);
        setActiveThirdLevelSubMenu(null);
      }
    };
 
    const handleOutsideClick = (event) => {
      if (
        !event.target.closest("nav") &&
        !event.target.closest(`.${styles.hamburger}`) &&
        isMobile()
      ) {
        setIsMobileMenuOpen(false);
        setActiveItem(null);
        setActiveSubMenu(null);
        setActiveThirdLevelSubMenu(null);
      }
    };
 
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
 
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Ocultamos el logo en pantallas pequeñas */}
        <a
          href="/"
          className={`${styles.logoContainer} ${styles.logoResponsive}`}
          onClick={(e) => {
            e.preventDefault();
            handleClick("http://51.222.110.107:3005/home");
          }}
        >
          <Image src={logo} alt="Logo" className={styles.logo} />
        </a>
        <div className={styles.hamburger} onClick={handleMobileMenuToggle}>
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.bar1 : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.bar2 : ""}`}
          ></div>
          <div
            className={`${styles.bar} ${isMobileMenuOpen ? styles.bar3 : ""}`}
          ></div>
        </div>
        <nav
          className={`${styles.nav} ${
            isMobileMenuOpen ? styles.navActive : ""
          }`}
        >
          {(isMobile() ? mobileNavbarItems : navbarItems).map((item) => (
            <div
              key={item.id}
              className={`${styles.navItem} ${
                activeItem === item.id ? styles.active : ""
              }`}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleMenuClick(item.id)}
            >
              <a
                href="#"
                className={`${styles.navLink} ${
                  isActive(item.link) ? styles.navLinkActive : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item.link);
                  if (isMobile() && item.submenu.length > 0) {
                    handleMenuClick(item.id);
                  }
                }}
              >
                {item.title}
              </a>
              {item.submenu.length > 0 &&
                ((isMobile() && activeItem === item.id) ||
                  (!isMobile() && activeItem === item.id)) &&
                renderSubMenu(item.submenu)}
            </div>
          ))}
        </nav>
      </div>
    </header>
  );
}