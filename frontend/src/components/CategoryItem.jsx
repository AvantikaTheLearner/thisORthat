export default function CategoryItem(props) {
  const { name } = props;
  return (
    <div>
      <ul>
        <li>{name}</li>
      </ul>
    </div>
  );
}
