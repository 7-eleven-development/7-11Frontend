import { ScrollView } from "react-native";
import SensorIndicator from "@/components/SensosrIndicator";
import { AIR_QUALITY_SENSORS } from "@/utils/config/sensorConfigs";
import { getAirQualityStatus } from "@/utils/airQualityUtils";

interface AirQualitySensorListProps {
  sensors: Array<{
    key: "co2" | "propane" | "smoke";
    value: number;
    status: any;
  }>;
  selectedSensor: string;
  onSensorSelect: (sensor: string) => void;
  style: any;
  contentStyle: any;
}

const AirQualitySensorList = ({
  sensors,
  selectedSensor,
  onSensorSelect,
  style,
  contentStyle,
}: AirQualitySensorListProps) => (
  <ScrollView
    horizontal
    style={style}
    contentContainerStyle={contentStyle}
    showsHorizontalScrollIndicator={false}
  >
    {sensors.map((sensor) => {
      const config = AIR_QUALITY_SENSORS[sensor.key];
      const statusColor = getAirQualityStatus(sensor.value, sensor.key);

      return (
        <SensorIndicator
          key={sensor.key}
          icon={sensor.status.icon}
          value={sensor.value}
          label={sensor.status.label}
          type={config.type}
          valueLabel={config.unit}
          status={statusColor}
          size="sm"
          isSelected={selectedSensor === sensor.key}
          onPress={() => onSensorSelect(sensor.key)}
        />
      );
    })}
  </ScrollView>
);

export default AirQualitySensorList;
