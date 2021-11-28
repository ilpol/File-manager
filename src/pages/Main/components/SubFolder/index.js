import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setStoreResponses } from '../../../../store/responsesSlice';

import apiUrl from '../../../../shared/constants';
import './styles.css';

const SubFolder = ({dirId, isFinal, children}) => {

  const savedResponses = useSelector((state) => state.responses.responses);
  const dispatch = useDispatch();

  const [folders2, setFolders2] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getSavedResponse = (savedId) => {
    let res = null;
    Object.keys(savedResponses).forEach((response) => {
        if (savedId === +response) {
          res = savedResponses[savedId]
        }
    });

    return res;
  }

  const loadSubFolders = () => {
    const path = `${apiUrl}?dirId=${dirId}`;

    if (!isFinal && !isVisible) { 
      const savedResponse =  getSavedResponse(dirId);
      if (savedResponse) {
        setFolders2(savedResponse?.children);
        dispatch(setStoreResponses(savedResponse));
      } else {
        setIsLoading(true);
        fetch(path)
          .then((res) => res.json())
          .then((folder) => { 
            setIsLoading(false); 
            setFolders2(folder?.children); 
            dispatch(setStoreResponses(folder));
          })
          .catch(err => {
            console.log('error loading, err = ', err);
          })
      }
    }
  }

  const handleClick = (e) => {
    e.stopPropagation(); 
    setIsVisible(!isVisible); 
    if (dirId && !isFinal) 
      loadSubFolders();
  }

  const arrowClassname = isVisible ? 'mainSection__arrowExpand mainSection__arrow'
                                   : 'mainSection__arrow';

  return (
    <>
      <div className="mainSection__subFolder"  onClick={(e) => {handleClick(e)}} >
        <div className="mainSection__folder-name">
          {isLoading ? 
                        <div class="mainSection__loadingio-spinner-rolling">
                          <div class="mainSection__ldio">
                          <div />
                        </div></div>
                      :
                      <div className={arrowClassname}>
                        {!isFinal && '\u2193 '}
                      </div>
          }
          {children}
        </div>
        {isVisible && folders2.map((folder, i) => {
          return(<SubFolder
                   isFinal={!(folder || {}).children}
                   dirId={(folder || {}).id }
                   key={i + (folder || {}).title}
                 >
              {(folder || {}).title}  
            </SubFolder>)
        })}
      </div>
    </>
  )
}

export default SubFolder;