export default function Search(props) {
  const { question, option } = props;
  
  return (
    <div>
      <p>{question}</p>
      <p>{option}</p>
    </div>
  );
}
