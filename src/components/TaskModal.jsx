import React from 'react'

const TaskModal = ({children, modalId, name, clearState}) => {
  return (
    <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
        data-bs-keyboard='false'
        data-bs-backdrop='static' 
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${modalId}Label`}>
                {name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={()=>clearState()}
              ></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={()=>clearState()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default TaskModal