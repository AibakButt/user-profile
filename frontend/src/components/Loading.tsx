import { Bars } from "react-loader-spinner"

const Loader = () => {
  return (
    <Bars
      height="25"
      width="25"
      color="grey"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  )
}

export default Loader;