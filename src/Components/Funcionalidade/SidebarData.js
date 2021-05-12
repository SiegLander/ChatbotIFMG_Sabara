import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Palavra-Chave",
    path: "/funcionalidade/palavrachave",
    icon: <AiIcons.AiOutlineKey />,
    cName: "nav-text",
  },
  {
    title: "Intenções",
    path: "/funcionalidade/intencoes",
    icon: <AiIcons.AiOutlineInsertRowAbove />,
    cName: "nav-text",
  },
  {
    title: "Respostas",
    path: "/funcionalidade/respostas",
    icon: <AiIcons.AiFillMessage />,
    cName: "nav-text",
  },
  {
    title: "Arquivos",
    path: "/funcionalidade/arquivo",
    icon: <AiIcons.AiTwotoneFolderOpen />,
    cName: "nav-text",
  },
  {
    title: "Histórico",
    path: "/funcionalidade/historico",
    icon: <FaIcons.FaHistory />,
    cName: "nav-text",
  },
  {
    title: "Lixeira",
    path: "/funcionalidade/lixeira",
    icon: <FaIcons.FaTrashAlt />,
    cName: "nav-text",
  },
  {
    title: "Sair",
    path: "/login",
    icon: <IoIcons.IoIosExit />,
    cName: "nav-text",
  },
];
