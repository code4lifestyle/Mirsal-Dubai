// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Login from './components/Login';
// import View from './components/View';
// import AddRecord from './components/Addrecord';
// import View_file from './components/View_file';
// import Edit_Record from './components/Edit_record';

// export default function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/view" element={<View />} />
//           <Route path="/add-record" element={<AddRecord />} />
//           <Route path="/View-file/:vccNo" element={<View_file />} />
//           <Route path="/Edit-record/:vccNo" element={<Edit_Record />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import View from './components/View';
import AddRecord from './components/Addrecord';
import View_file from './components/View_file';
import Edit_Record from './components/Edit_record';
import TitleManager from './components/TitleManager';

export default function App() {
  return (
    <Router>
      {/* must be inside Router */}
      <TitleManager />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/view" element={<View />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/View-file/:vccNo" element={<View_file />} />
        <Route path="/Edit-record/:vccNo" element={<Edit_Record />} />
      </Routes>
    </Router>
  );
}
