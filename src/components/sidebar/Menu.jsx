import { NavLink } from "react-router-dom";
import SidebarLinkGroup from "./SideBarLinkGroup";
import { FaHouse } from "react-icons/fa6";

const Menu = ({ menu, sidebarExpanded, setSidebarExpanded, pathname }) => {
  return (
    <ul>
      <li>
        <NavLink
          to="/"
          className={`flex flex-wrap gap-4 hover:text-sea3 hover:bg-meta-4 transition-colors px-6 py-3 ${
            pathname === "/" && "bg-graydark dark:bg-meta-4"
          }`}
        >
          <FaHouse className="text-2xl pt-1" />
          <span className={`text-lg `}>Home</span>
        </NavLink>
      </li>
      {menu.map((e) =>
        e.path ? (
          <li key={e.title}>
            <NavLink
              to={e.path}
              className={`flex flex-wrap gap-4  hover:text-sea3 hover:bg-meta-4 transition-colors px-6 py-3 ${
                pathname.includes(e.path) && "bg-graydark dark:bg-meta-4"
              }`}
            >
              <e.icon className="text-2xl pt-1" />
              <span className={`text-lg `}>{e.title}</span>
            </NavLink>
          </li>
        ) : (
          <SidebarLinkGroup
            key={e.title}
            activeCondition={
              pathname === e.linkName || pathname.includes(e.linkName)
            }
          >
            {(handleClick, open) => {
              return (
                <>
                  <NavLink
                    to="#"
                    className={`group relative flex items-center gap-4 rounded-sm py-2 px-6  hover:text-sea3 hover:bg-meta-4 duration-300 ease-in-out  dark:hover:bg-meta-4 ${
                      pathname.includes(e.linkName) &&
                      "bg-graydark dark:bg-meta-4"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      sidebarExpanded
                        ? handleClick()
                        : setSidebarExpanded(true);
                    }}
                  >
                    <e.icon className="text-2xl pt-1" />
                    <span className={`text-lg `}>{e.title}</span>
                    <svg
                      className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                        open && "rotate-180"
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill=""
                      />
                    </svg>
                  </NavLink>
                  <div
                    className={`translate transform overflow-hidden ${
                      !open && "hidden"
                    }`}
                  >
                    <ul>
                      {e.subLinks.map((el) => (
                        <li key={`sub-${el.title}`}>
                          <NavLink
                            to={el.path}
                            className={({ isActive }) =>
                              "group relative flex items-center  gap-2.5 rounded-md py-2 px-10 font-medium duration-300 ease-in-out hover:text-sea3 " +
                              (isActive && "!text-sea3")
                            }
                          >
                            <el.icon className="text-2xl pt-1" />
                            <span className={`text-lg `}>{el.title}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              );
            }}
          </SidebarLinkGroup>
        )
      )}
    </ul>
  );
};

export default Menu;
