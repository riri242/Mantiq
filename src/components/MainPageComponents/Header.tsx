// src/components/MainPage/Header.tsx
import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/AuthContext"; 

const navigation = [
  { name: "الرئيسية", href: "/welcome" },
  { name: "المسارات", href: "/courses" }, 
  { name: "حولنا", href: "/about" },
];

type HeaderProps = {
  hideLoginButton?: boolean;
};

export default function Navbar({ hideLoginButton = false }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  //  المستخدم من AuthContext
  const { user: currentUser } = useAuthContext();

  const displayName =
    currentUser?.displayName ||
    currentUser?.email?.split("@")[0] ||
    "مستخدم";

  const goHome = () => {
    if (currentUser) {
      navigate("/main");
    } else {
      navigate("/welcome");
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between px-6 lg:px-12 py-4
                   backdrop-blur-lg bg-white/10 rounded-b-2xl shadow-md"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <button
            onClick={goHome}
            className="-m-1.5 p-1.5 flex items-center gap-2"
          >
            <img
              alt="Logo"
              src="/logo.svg"
              className="h-10 scale-120 w-auto pl-3 hover:scale-130 drop-shadow-[0_0_8px_#fff] transition"
            />
          </button>
        </div>

        {/* Mobile button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:drop-shadow-[0_0_6px_#fff] transition"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) =>
            item.href === "#" ? (
              <span
                key={item.name}
                className="text-sm font-semibold text-white/70 cursor-default"
              >
                {item.name}
              </span>
            ) : (
              <button
                key={item.name}
                onClick={() =>
                  item.name === "الرئيسية" ? goHome() : navigate(item.href)
                }
                className="text-sm font-semibold text-white hover:text-white hover:drop-shadow-[0_0_8px_#fff] transition"
              >
                {item.name}
              </button>
            )
          )}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {currentUser ? (
            <Link
              to="/user-info"
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full
                         bg-white/10 border border-white/20 text-sm text-white
                         hover:bg-white/20 hover:drop-shadow-[0_0_10px_#fff]
                         transition duration-300"
            >
              <span className="font-mono capitalize">{displayName}</span>
              <UserCircleIcon className="w-5 h-5" />
            </Link>
          ) : !hideLoginButton ? (
            <Link
              to="/SignPage"
              className="px-4 py-2 rounded-lg border border-white text-sm font-semibold text-white 
                         backdrop-blur-sm bg-white/5 hover:bg-white hover:text-black 
                         transition duration-300"
            >
              تسجيل الدخول
            </Link>
          ) : (
            <div />
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-sm overflow-y-auto backdrop-blur-xl bg-black/70 p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <button onClick={goHome} className="flex items-center gap-2">
              <img
                alt="Logo"
                src="/logo.svg"
                className="h-9 w-auto scale-180 pl-3.5 pt-2"
              />
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md p-2.5 text-gray-200 hover:drop-shadow-[0_0_6px_#fff] transition"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) =>
                  item.href === "#" ? (
                    <span
                      key={item.name}
                      className="block rounded-lg px-3 py-2 text-base font-semibold text-white/60"
                    >
                      {item.name}
                    </span>
                  ) : (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (item.name === "الرئيسية") {
                          goHome();
                        } else {
                          navigate(item.href);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-right rounded-lg px-3 py-2 text-base font-semibold text-white 
                                 hover:bg-white/10 hover:drop-shadow-[0_0_8px_#fff] transition"
                    >
                      {item.name}
                    </button>
                  )
                )}
              </div>

              {/* Mobile bottom */}
              <div className="py-6">
                {currentUser ? (
                  <Link
                    to="/user-info"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-full px-4 py-2.5 text-base font-semibold text-white
                               border border-white/40 bg-white/10 text-center
                               hover:bg-white hover:text-black transition"
                  >
                    حسابي
                  </Link>
                ) : !hideLoginButton ? (
                  <Link
                    to="/SignPage"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-base font-semibold text-white
                               border border-white text-center hover:bg-white hover:text-black transition"
                  >
                    تسجيل الدخول
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
