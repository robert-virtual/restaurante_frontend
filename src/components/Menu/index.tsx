import { setShowMenu, selectShowMenu } from "@store/Slices/appSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth, resetSecData } from "@store/Slices/secSlice";

import {
  BiLogIn,
  BiLogOut,
  BiUserPlus,
  BiListUl,
} from "react-icons/bi";

import "./Menu.css";

const Menu = () => {
  const user = useSelector(selectAuth);
  const showMenu = useSelector(selectShowMenu);
  const dispatch = useDispatch();
  const classNames = showMenu ? "menu" : "menu hidden";
  const navigate = useNavigate();
  const onClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(setShowMenu(!showMenu));
    navigate((e.target as HTMLAnchorElement).getAttribute("href") || "");
  };
  const onLogoutHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(resetSecData());
    dispatch(setShowMenu(!showMenu));
    navigate("/signin");
  };
  if (!user?.token) {
    return (
      <nav className={classNames}>
        <ul>
          <li>
            <a href="/signin" onClick={onClickHandler}>
              <BiLogIn />
              &nbsp;Iniciar Sesión
            </a>
          </li>
          <li>
            <a href="/productos" onClick={onClickHandler}>
              <BiListUl />
              &nbsp;Productos
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className={classNames}>
        <ul>
          <li>
            <a href="/home" onClick={onLogoutHandler}>
              <BiLogOut />
              &nbsp;Cerrar Sesión
            </a>
          </li>
          <li>
            <a href="/productos" onClick={onClickHandler}>
              <BiListUl />
              &nbsp;Productos
            </a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Menu;
