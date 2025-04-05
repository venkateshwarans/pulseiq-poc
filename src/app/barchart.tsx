import { Card, CardHeader, BarChart as CrayonBarChart } from "@crayonai/react-ui";
import { BarChart as BarChartIcon } from "lucide-react";

interface BarChartDataItem {
  label: string;
  value: number;
}

interface BarChartTemplateProps {
  title: string;
  categoryKey: string;
  data: BarChartDataItem[];
  description?: string;
  theme?: "ocean" | "orchid" | "emerald" | "sunset" | "spectrum" | "vivid";
}

export const BarChartTemplate = (props: BarChartTemplateProps) => {
  // Transform data to the format expected by the BarChart component
  const transformedData = props.data.map(item => ({
    [props.categoryKey]: item.label,
    value: item.value
  }));

  return (
    <Card variant="card" width="standard">
      <CardHeader
        title={<p style={{ textAlign: "left" }}>{props.title}</p>}
        icon={<BarChartIcon size={"1em"} />}
        subtitle={props.description}
      />
      <div style={{ height: "300px", width: "100%", padding: "16px" }}>
        <CrayonBarChart
          data={transformedData}
          categoryKey={props.categoryKey}
          theme={props.theme || "ocean"}
        />
      </div>
    </Card>
  );
}
