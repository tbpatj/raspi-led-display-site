import { useContext } from "react";
import SettingsController from "./SettingsController";
import { SettingsContext } from "../../Context/SettingsContext";

interface NewDeviceProps {
  onFinish: () => void;
}

const NewDevice: React.FC<NewDeviceProps> = ({ onFinish }) => {
  // const [isEditing, setIsEditing] = useState(false);
  // const [editing, setEditing] = useState("");
  // const { toggleTvShown, addDevice } = useContext(GlobalContext);
  const { device, updateDevice } = useContext(SettingsContext);

  // const onNameEdit = (val: string) => {
  //   const nDevice = cloneDeep(device);
  //   nDevice.name = val;
  //   updateDevice(nDevice);
  // };

  // const isButtonDisabled = useMemo(() => {
  //   if (device.name === "") return true;
  //   if (
  //     device.type === "addressable" &&
  //     !(device as RGBAddressableDevice)?.tv_settings?.configured
  //   )
  //     return true;
  //   return false;
  // }, [device]);

  // const baseOptions = useMemo(() => {
  //   if (device.type === "addressable")
  //     return ["type", "pin_out", "tv_settings"];
  //   else if (device.type === "non-addressable") return ["type", "pin_out"];
  //   else return ["type", "pin_out"];
  // }, [device]);

  // const getDisplayValue = (value: any) => {
  //   if (typeof value === "string") return value;
  //   else if (typeof value === "number") return value.toString();
  //   else return "";
  // };

  // const createDevice = async () => {
  //   const response = await addDevice(device);
  //   onFinish();
  //   console.log(response);
  // };

  return (
    <SettingsController
      title="New Device"
      values={device}
      options={["name", "type", "tv_settings", "device_confirm"]}
    />
  );
};

export default NewDevice;
