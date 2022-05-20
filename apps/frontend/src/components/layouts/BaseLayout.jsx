import Header from "../ui/Header"

const BaseLayout = (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
}

export default BaseLayout
