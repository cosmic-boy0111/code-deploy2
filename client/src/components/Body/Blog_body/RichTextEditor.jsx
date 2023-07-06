// import React, { useState, useRef } from 'react';
// import JoditEditor from 'jodit-react';

// const RichTectEditor = ({ blogData, setBlogData }) => {
// 	const editor = useRef(null);
// 	const [content, setContent] = useState(blogData.description);

	

// 	return (
// 		<JoditEditor
// 			ref={editor}
// 			value={content}
//             config = {
//                 {
//                     readonly: false, // all options from https://xdsoft.net/jodit/doc/,
                    
//                 }
//             }
// 			tabIndex={1} // tabIndex of textarea
// 			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
// 			onChange={newContent => {
// 				setContent(newContent);
//                 setBlogData({
//                     ...blogData, 'description' : newContent
//                 })
//             }}
            
// 		/>
// 	);
// };

// export default RichTectEditor;

import React, { useState, useRef, useEffect} from 'react';
import JoditEditor from 'jodit-react';


const Example = ({ blogData , setBlogData }) => {
	const editor = useRef(null);
	const [content, setContent] = useState(blogData.description);

	useEffect(() => {
	  setContent(blogData.description);
	}, [blogData])
	

	return (
		<JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {
				setBlogData({
					...blogData,
					'description' : newContent
				})
			}}
		/>
	);
};

export default Example;