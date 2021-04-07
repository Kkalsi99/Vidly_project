const Like = (props) => {
  return (
    <i
      className={props.liked === true ? "fa fa-heart" : "fa fa-heart-o"}
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
