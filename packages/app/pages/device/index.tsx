import type { NextPage } from "next";
import Head from "next/head";
import Device from "app/components/Device";
import DeviceListWrapper from "app/components/ListItem";
import Toggle from "app/components/Toggle";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Blinder - Smart blind automation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mb-8 text-4xl md:text-6xl font-bold leading-tight tracking-tighter text-neutral-800">
        Devices
      </div>
      <DeviceListWrapper>
        <Device
          key="livingroom"
          label="Living Room"
          action={
            <Toggle
              id=""
              state
              onChange={() => {
                console.log("vv");
              }}
            />
          }
        />
      </DeviceListWrapper>
      <DeviceListWrapper>
        <Device
          key="bedroom"
          label="Bedroom"
          action={
            <Toggle
              id=""
              state
              onChange={() => {
                console.log("vv");
              }}
            />
          }
        />
      </DeviceListWrapper>
    </>
  );
};

export default Home;
