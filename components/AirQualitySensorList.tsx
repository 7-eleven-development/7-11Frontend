import { ScrollView, AccessibilityRole } from "react-native";
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
  // Add accessibility props
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
}

const AirQualitySensorList = ({
  sensors,
  selectedSensor,
  onSensorSelect,
  style,
  contentStyle,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
}: AirQualitySensorListProps) => {
  // Create sensor name mapping for Swedish
  const getSensorName = (key: string) => {
    switch (key) {
      case "co2":
        return "Koldioxid";
      case "propane":
        return "Propan";
      case "smoke":
        return "Rök";
      default:
        return key;
    }
  };

  return (
    <ScrollView
      horizontal
      style={style}
      contentContainerStyle={contentStyle}
      showsHorizontalScrollIndicator={false}
      accessible={true}
      accessibilityRole={accessibilityRole || "tablist"}
      accessibilityLabel={
        accessibilityLabel || "Lista över luftkvalitetssensorer"
      }
      accessibilityHint={
        accessibilityHint || "Bläddra horisontellt för att se alla sensorer"
      }
    >
      {sensors.map((sensor) => {
        const config = AIR_QUALITY_SENSORS[sensor.key];
        const statusColor = getAirQualityStatus(sensor.value, sensor.key);
        const sensorName = getSensorName(sensor.key);

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
            accessibilityRole="tab"
            accessibilityLabel={`${sensorName}: ${sensor.value} ${config.unit}, status: ${statusColor}${selectedSensor === sensor.key ? ", vald" : ""}`}
            accessibilityHint={`Tryck för att välja ${sensorName}sensor och visa dess diagram`}
          />
        );
      })}
    </ScrollView>
  );
};

export default AirQualitySensorList;
