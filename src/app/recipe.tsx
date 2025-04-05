import { Card, CardHeader, Tag, TagBlock } from "@crayonai/react-ui";
import { FlaskConical as FlaskConicalIcon } from "lucide-react";
import { StepsItem, Steps } from "@crayonai/react-ui/Steps";

interface RecipeTemplateProps {
  title: string;      // Name of the recipe
  ingredients: string[];  // List of required ingredients
  steps: string[];    // Step-by-step cooking instructions
}

export const RecipeTemplate = (props: RecipeTemplateProps) => {
  console.log(props);
  return (
    <Card variant="card" width="standard">
      <CardHeader
        title={<p style={{ textAlign: "left" }}>{props.title}</p>}
        icon={<FlaskConicalIcon size={"1em"} />}
      />
      <TagBlock>
        {props.ingredients.map((ingredient, index) => (
          <Tag key={index} text={<p style={{ textAlign: "left" }}>{ingredient}</p>} />
        ))}
      </TagBlock>
      <Steps>
        {props.steps.map((step: any, index) => (
          <StepsItem key={index} title={step.title} details={step.details} />

        ))}
      </Steps>
    </Card>
  );
}