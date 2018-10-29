import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ServiceRow } from "./serviceRow";

export interface Service {
  id: number;
  url: string;
  indexName: string;
  typeName: string;
  // TODO: Change string type to a datetime type.
  lastFetch: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceTableState {
  services: Service[];
}

class ServicesTable extends React.Component<{}, ServiceTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    this.loadServices();
  }

  async loadServices() {
    const services = await axios.get<any[]>("/apis/services");
    this.setState({
      services: services.data
    });
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th />
            <th>ID</th>
            <th>Index Name</th>
            <th>URL</th>
            <th>Created On</th>
            <th>Last Updated On</th>
          </tr>
        </thead>
        <tbody>
          {this.state.services.map(s => (
            <ServiceRow service={s} />
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state: any) => {
  return state;
};

const reduxComp = connect(
  mapStateToProps,
  {}
)(ServicesTable);

export { reduxComp as Services };
