export default function Category(props) {
const {name} = props;
console.log("props.categories: ", props.categories);

  return(
    <p>{name}</p>
  )
}