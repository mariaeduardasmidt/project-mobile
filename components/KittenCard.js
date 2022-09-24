import { Card, Button } from "react-native-paper";

export default function KittenCard({ image, title, children, buttonLabel = "Clique aqui", buttonPress, ...props }) {
  return (
    <Card {...props}>
      {image && <Card.Cover source={{ uri: image }} />}
      <Card.Title title={title} />
      {children && <Card.Content>{children}</Card.Content>}
      <Card.Actions>
        <Button mode="contained" onPress={buttonPress}>
          {buttonLabel}
        </Button>
      </Card.Actions>
    </Card>
  );
}