import { Card, Paragraph, Button } from "react-native-paper";

function clicaBotao(){
  return (
    alert('O botão foi clicado.')
  )
}

export default function KittenCard({image, title, text, buttonLabel = "Quero gatinho", ...props}) {
  return (
    <Card {...props}>
      {image && <Card.Cover source={{ uri: imagem }} />}
      <Card.Title title={title} />
      <Card.Content>
        <Paragraph>{text}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button mode="contained" onPress={() => clicaBotao()}>
          {buttonLabel}
        </Button>
      </Card.Actions>
    </Card>
  );
}