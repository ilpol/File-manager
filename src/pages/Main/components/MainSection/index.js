import React, { useEffect, useState } from "react";
import apiUrl from '../../../../shared/constants';
import { SubFolder } from '../index';
import './styles.css';

const MainSection = () => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
     fetch(apiUrl)
      .then((res) => res.json())
      .then((folder) => { setFolders(folder?.children) })
      .catch(err => {
        console.log('error loading, error = ', err);
      })
  }, [])

  return (
    <section>     
      {folders.map((folder, i) => {
        return (
          <div key={i + (folder || {}).title}>
             
             <SubFolder isFinal={!(folder || {}).children} dirId={folder.id} className="mainSection__folder">
               {(folder || {}).title}  
             </SubFolder>
                        
          </div>
        );
      })}
    </section>
  )
}

export default MainSection;