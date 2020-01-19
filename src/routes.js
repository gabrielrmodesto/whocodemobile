import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigaiton-stack";
import Main from "./pages/Main";
import Profile from "./pages/Profile";

const Routes = createAppContainer(
  createStackNavigator({
    Main,
    Profile
  })
);

export default Routes;
