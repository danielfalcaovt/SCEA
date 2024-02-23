export default function Gerenciar(props) {
  switch (props.func) {
    case "alter":
      
      break;
    case "cad":

      break;
    case "del":

      break;
    case "con":
        
      break;    
    default:

      break;
  }
  return(
    <>
      <h1>
        SGEA
      </h1>
      <form>
      <input placeholder="Produto" required maxlength="20" type="text" name="produto" id="produto"/>
      <input placeholder="Estoque" required max="100000000" type="number" name="estoque" id="valor"/>
      <input placeholder="Preço" format="currency" precision="2" required type="number" name="price" id="price" step="0.010"/>
      <button></button>
      </form>
    </>
  )
};
