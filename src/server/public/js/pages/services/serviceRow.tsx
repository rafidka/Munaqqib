import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Service } from ".";

interface ServiceRowState {
  service: Service;
  isEditing: boolean;
}

export class ServiceRow extends React.Component<
  { service: Service },
  ServiceRowState
> {
  constructor(props: { service: Service }) {
    super(props);
    this.state = {
      service: props.service,
      isEditing: false
    };
  }

  onEdit() {
    this.setState({
      isEditing: true
    });
  }

  onSave() {
    this.setState({
      isEditing: false
    });
  }

  onCancel() {
    this.setState({
      isEditing: false
    });
  }

  render() {
    if (this.state.isEditing) {
      return this.renderEdit();
    } else {
      return this.renderView();
    }
  }

  renderView() {
    return (
      <tr key={this.state.service.id}>
        <td>
          <a style={{ cursor: "pointer" }} onClick={() => this.onEdit()}>
            <FontAwesomeIcon icon={faEdit} />
          </a>
        </td>
        <td>{this.state.service.id}</td>
        <td>{this.state.service.indexName}</td>
        <td>{this.state.service.url}</td>
        <td>{this.state.service.createdAt}</td>
        <td>{this.state.service.updatedAt}</td>
      </tr>
    );
  }

  renderEdit() {
    return (
      <tr key={this.state.service.id}>
        <td>
          <a style={{ cursor: "pointer" }} onClick={() => this.onSave()}>
            <FontAwesomeIcon icon={faSave} />
          </a>
          <a style={{ cursor: "pointer" }} onClick={() => this.onCancel()}>
            <FontAwesomeIcon icon={faTimes} />
          </a>
        </td>
        <td>{this.state.service.id}</td>
        <td>{this.state.service.indexName}</td>
        <td>{this.state.service.url}</td>
        <td>{this.state.service.createdAt}</td>
        <td>{this.state.service.updatedAt}</td>
      </tr>
    );
  }
}
