import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import Header from "../components/Header";
import Order from "../components/Order/Order";
import Deliver from "../components/Deliver/Deliver";
import AddRestaurant from "../components/AddRestaurant/AddRestaurant";
import {getAreas} from "../code/functions";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#009688"
    },
    secondary: {
      main: "#0076BE"
    },
    ternary: {
      main: "#ef3836"
    },
    writing: {
      main: "#505050"
    },
    solid: {
      main: "#e0e0e0"
    }
  }
});

export default class MasterLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 0,
      areas: []
    }
  }

  setTab = (index) => {
    this.setState({ tab: index });
  };

  componentDidMount = async () => {
    let areas = await getAreas();
    if (areas) this.setState({areas});
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ margin: "0px 20%" }}>
          <Header setTab={this.setTab} tab={this.state.tab} />
          {this.state.tab === 0 ?
            <Order areas={this.state.areas}/>
            : this.state.tab === 1 ?
              <Deliver areas={this.state.areas}/>
              : <AddRestaurant areas={this.state.areas}/>
          }
        </div>
      </MuiThemeProvider>
    );
  }
}