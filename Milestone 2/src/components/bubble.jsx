import React, { useState, useEffect } from 'react'; 
import Bubble from '../bubble'; 

const ParentComponent = () => {   
	const [csvData, setCsvData] = useState(null);    
	useEffect(() => {     
		fetch('Cost of Living Index With Population 2.csv')       
			.then((response) => response.text())       
			.then((text) => setCsvData(text));   
	}, []);    

	return <Bubble csvData={csvData} />; 
};  
export default ParentComponent;