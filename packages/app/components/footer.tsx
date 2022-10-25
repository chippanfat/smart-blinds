import React, { ReactElement } from "react";

function Copyright(): ReactElement {
  return <span>Copyright &copy; 2020 - {new Date().getFullYear()}</span>;
}

export default function Footer() {
  return (
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
            <Copyright />
            <a
              href="https://wickedlabs.dev"
              className="mx-2 text-wickedblue hover:text-gray-500"
              rel="noopener noreferrer"
            >
              @yadayada
            </a>
            Since 2020
          </span>
        </div>
      </div>
    </footer>
  );
}
