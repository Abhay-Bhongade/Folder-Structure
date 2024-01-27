import React, { useState } from 'react';
import TreeView from 'react-treeview';
import 'react-treeview/react-treeview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import "../src/App.css";




const FileExplorer = ({ data }) => {
  const [expanded, setExpanded] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [newItemName, setNewItemName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = (node) => {
    if (expanded.includes(node)) {
      setExpanded(expanded.filter((item) => item !== node));
    } else {
      setExpanded([...expanded, node]);
    }
  };

  const handleCreateItem = () => {
    if (selectedNode && newItemName.trim() !== '') {
      const newItem = { name: newItemName, type: 'file' }; 
      selectedNode.children = selectedNode.children ? [...selectedNode.children, newItem] : [newItem];
      setExpanded([...expanded, selectedNode]);
      setNewItemName('');
    }
  };



  const handleDeleteItem = () => {
    if (selectedNode) {
      const parent = getParentNode(data, selectedNode.name);
      if (parent) {
        parent.children = parent.children.filter((child) => child.name !== selectedNode.name);
        setExpanded([...expanded]);
        setSelectedNode(null);
      }
    }
  };

  const handleRenameItem = () => {
    if (selectedNode && newItemName.trim() !== '') {
      selectedNode.name = newItemName;
      setExpanded([...expanded]);
      setNewItemName('');
      setIsEditing(false); 
    }
  };

  const handleEditItem = () => {
    if (selectedNode) {
      setIsEditing(true);
      setNewItemName(selectedNode.name);
    }
  };


  const getParentNode = (node, itemName) => {
    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        if (child.name === itemName) {
          return node;
        }
        const parent = getParentNode(child, itemName);
        if (parent) return parent;
      }
    }
    return null;
  };

  const renderTree = (node) => {
    return (
        <TreeView
        key={node.name}
        nodeLabel={
          <div>
            <FontAwesomeIcon icon={node.type === 'folder' ? faFolder : faFile} />
            <span className={node.type === 'folder' ? "text-primary ms-1" : "text-muted ms-1"}>{node.name}</span>
            <span className='ms-2'>
              <FontAwesomeIcon icon={faPlus} onClick={() => setSelectedNode(node)} />
              <FontAwesomeIcon icon={faEdit} onClick={handleEditItem} className={`mx-1 ${isEditing && selectedNode === node ? 'editing' : ''}`} />
              <FontAwesomeIcon icon={faTrash} onClick={() => setSelectedNode(node)} />
            </span>
          </div>
        }
        collapsed={!expanded.includes(node)}
        onClick={() => handleToggle(node)}
      >
        {Array.isArray(node.children) ? node.children.map(renderTree) : null}
      </TreeView>
    );
  };
  return (
    <div className="container-fluid py-3">
      <div className="row">
        <div className="col-md-4">
          <div>
            <div className='file-input-container'>
              <input
                type="text"
                className='input-field me-1'
                placeholder={isEditing ? "Edit item name" : "New item name"}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <div className='mt-1'>
                <button onClick={isEditing ? handleRenameItem : handleCreateItem}>
                  {isEditing ? 'Save' : 'Create'}
                </button>
                <button onClick={handleEditItem} disabled={!selectedNode || isEditing}>
                  Edit
                </button>
                <button onClick={handleDeleteItem} disabled={!selectedNode || isEditing}>
                  Delete
                </button>
              </div>
            </div>
            {renderTree(data)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;


