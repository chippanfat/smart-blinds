import { Fragment, ReactElement, createElement } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  DeviceTabletIcon,
  QueueListIcon,
  ClockIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const naviItems = new Map([
  ["devices", { name: "Devices", href: "/device", icon: DeviceTabletIcon }],
  ["groups", { name: "Groups", href: "/group", icon: QueueListIcon }],
  ["schedules", { name: "Schedules", href: "/schedule", icon: ClockIcon }],
  ["settings", { name: "Settings", href: "/settings", icon: Cog6ToothIcon }],
]);

function RenderMobileNavBarItem({ navKey }: { navKey: string }): ReactElement {
  const item = naviItems.get(navKey);

  if (!item) {
    throw new Error("Invalid navigation key");
  }

  const icon = createElement(item.icon, {
    width: 24,
    height: 24,
    className: "h-6 w-6 flex-shrink-0 text-indigo-600",
    "aria-hidden": true,
  });

  return (
    <a
      key={item.name}
      href={item.href}
      className="-m-3 flex items-center rounded-md p-3 hover:bg-gray-50"
    >
      {icon}
      <span className="ml-3 text-base font-medium text-gray-900">
        {item.name}
      </span>
    </a>
  );
}

function RenderNavBarItem({ navKey }: { navKey: string }): ReactElement {
  const item = naviItems.get(navKey);

  if (!item) {
    throw new Error("Invalid navigation key");
  }

  const icon = createElement(item.icon, {
    width: 24,
    height: 24,
    className: "mr-1 text-indigo-500",
  });

  return (
    <>
      <a
        href={item.href}
        className="whitespace-nowrap text-base font-medium text-black-500 hover:text-gray-900 px-2"
      >
        <span className="flex flex-row">
          {icon} {item.name}
        </span>
      </a>
    </>
  );
}

export default function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Popover className="relative bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#">
                <span className="sr-only">Blndr</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
            </div>
            <div className="-my-2 -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <RenderNavBarItem navKey="devices" />
              <RenderNavBarItem navKey="groups" />
              <RenderNavBarItem navKey="schedules" />
              <RenderNavBarItem navKey="settings" />
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
          >
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pt-5 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-8">
                    <RenderMobileNavBarItem navKey="devices" />
                    <RenderMobileNavBarItem navKey="groups" />
                    <RenderMobileNavBarItem navKey="schedules" />
                    <RenderMobileNavBarItem navKey="settings" />
                  </nav>
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <main className="container mx-auto px-6 mt-6 mb-auto h-full">
        {children}
      </main>
      <footer
        className="container mx-auto px-6 mt-6 bg-white"
        aria-labelledby="footer-heading"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="px-4 py-12 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-16">
          <div className="flex flex-wrap items-baseline lg:justify-center">
            <span className="mt-2 text-sm font-light text-gray-500">
              Copyright © 2020 - 2021
              <a
                href="https://wickedlabs.dev"
                className="mx-2 text-wickedblue hover:text-gray-500"
                rel="noopener noreferrer"
              >
                @wickedlabsHQ
              </a>
              . Since 2020
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
