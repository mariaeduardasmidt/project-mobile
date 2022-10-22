import { Card } from "react-native-paper";

export default function KittenCard({ image, title, titleStyle, children, 
  buttonLabel, buttonPress, ...props }) {

  return (
    <Card {...props}>
      {image && <Card.Cover source={{ uri: image }} />}
      <Card.Title title={title} titleStyle={titleStyle} />
      {children && <Card.Content>{children}</Card.Content>}
      <Card.Actions>
      </Card.Actions>
    </Card>
  );
}