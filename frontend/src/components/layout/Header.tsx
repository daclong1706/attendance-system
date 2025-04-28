import { Button, DarkThemeToggle } from "flowbite-react";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarToggle,
} from "flowbite-react";
import { useAppSelector } from "../../store/hook";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

interface Props {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: Props) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const navigate = useNavigate();

  // Kiểm tra nếu đường dẫn chứa "admin/class-management/:id" hoặc "teacher/class/:id"
  const showBackButton =
    /^\/(admin\/class-management|teacher\/class)\/\d+$/.test(location.pathname);

  return (
    <>
      <Navbar fluid rounded className="rounded-2xl shadow">
        <NavbarBrand>
          <NavbarToggle onClick={toggleSidebar} />
          {showBackButton && (
            <Button onClick={() => navigate(-1)}>
              <HiArrowLeft />
            </Button>
          )}
        </NavbarBrand>
        <div className="flex gap-2 md:order-2">
          <DarkThemeToggle />
          <div className="my-1 mr-2 border border-gray-400"></div>
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex gap-2">
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
                <div className="hidden flex-col items-start justify-center md:flex">
                  <span className="block text-sm">{user?.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email}
                  </span>
                </div>
              </div>
            }
          >
            <DropdownHeader className="block md:hidden">
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                name@flowbite.com
              </span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
          </Dropdown>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
