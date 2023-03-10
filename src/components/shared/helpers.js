import { Component } from 'react';
import addIcon from '../../assets/add.svg';
import deleteIcon from '../../assets/delete.svg';

export function handleBlur(section) {
  return (newText, target, ids) => {
    this.setState((prevState) => {
      return {
        [section]: findAndEdit(prevState[section], ids, newText, target),
      };
    });
  };
}

function findAndEdit(data, id, newText, target = 'data') {
  if (id.length === 1) {
    return data.map((item) =>
      item.id === id[0]
        ? {
            ...item,
            [target]: {
              ...item[target],
              input: newText === '' ? item[target].default : newText,
            },
          }
        : item
    );
  }
  const idArrayCopy = [...id];
  const currentId = idArrayCopy.shift();
  return data.map((item) =>
    item.id === currentId
      ? { ...item, [target]: findAndEdit(item[target], idArrayCopy, newText) }
      : item
  );
}

export function AddButton({ onClick, whatToAdd }) {
  return (
    <button
      className={`icon-button add-button add-${whatToAdd}-button`}
      type="button"
      onClick={onClick}
    >
      <img src={addIcon} alt={`add ${whatToAdd}`} />
    </button>
  );
}

export class DeleteButton extends Component {
  render() {
    return (
      <button
        className={`icon-button delete-button delete-${this.props.whatToDelete}-button`}
        type="button"
        onClick={this.props.onClick}
      >
        <img src={deleteIcon} alt={`delete ${this.props.whatToDelete}`} />
      </button>
    );
  }
}
