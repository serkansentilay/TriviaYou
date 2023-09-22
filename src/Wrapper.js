import { Provider } from "react-redux"
import { store } from "./context/store"
import Router from "./Router"

export default Wrapper = () => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}