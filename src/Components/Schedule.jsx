import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableRow, TableContainer, TableCell, TableHead, Checkbox, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

function Schedule() {
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const[admin,setAdmin] = useState([])
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');

  const navigate = useNavigate();

  const adminId = localStorage.getItem('adminId');

  console.log(adminId);

  const fetchUserData = async () => {
    try {
      const result = await axios.get('http://localhost:3001/api/user/users');
      setEmployeesData(result.data.allUsers);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchAdminData = async () => {
    try {
      const result = await axiosInstance.post('/user/admin', admin);
      // const result = await axios.get('http://localhost:3001/api/user/admin');
      console.log(result.data.result)
      setAdmin(result.data.result)
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAdminData()
  }, []);
console.log('admin',admin)
  const handleCheckboxChange = (employee) => {
    setSelectedEmployees((prev) =>
      prev.includes(employee)
        ? prev.filter((item) => item._id !== employee._id)
        : [...prev, employee]
    );
  };

  const handleSelectAllChange = () => {
    if (selectedEmployees.length === employeesData.length) {
      setSelectedEmployees([]); // Uncheck all if all are selected
    } else {
      setSelectedEmployees(employeesData); // Select all
    }
  };

  const isAllSelected = selectedEmployees.length === employeesData.length;
  console.log(selectedEmployees);

  const sendHandler = async (e) => {
    e.preventDefault();
    let data = {
      employees: selectedEmployees,
      date: date,
      time: time,
      comment: comment,
      createdBy: admin,
    };

    try {
      let response = await  axiosInstance.post('schedule/createSchedule', data);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Schedule</h3>
      <Button variant="contained" onClick={logoutHandler}>
        Logout
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox checked={isAllSelected} onChange={handleSelectAllChange} />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeesData?.map((emp) => {
              return (
                <TableRow key={emp._id}>
                  <TableCell>
                    <Checkbox
                      onChange={() => handleCheckboxChange(emp)}
                      checked={selectedEmployees.some((e) => e._id === emp._id)}
                    />
                  </TableCell>
                  <TableCell>{emp.username}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <div>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          type="time"
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={200}
          placeholder="Schedule Comment"
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
      <Button onClick={sendHandler} variant="contained">
        SUBMIT
      </Button>
    </div>
  );
}

export default Schedule;










// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, TableBody, TableRow, TableContainer, TableCell, TableHead, Checkbox, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// function Schedule() {
//   const [employeesData, setEmployeesData] = useState([]);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [date, setDate] = useState('');
//   const[time,setTime] = useState('');
//   const [comment, setComment] = useState('');

  
// const navigate = useNavigate()

// const adminId = localStorage.getItem('adminId')

// console.log(adminId)
//   const fetchUserData = async () => {
//     try {
//       const result = await axios.get('http://localhost:3001/api/user/users');
//       setEmployeesData(result.data.allUsers);
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const handleCheckboxChange = (employee) => {
//     setSelectedEmployees((prev) =>
//       prev.includes(employee) ? prev.filter(item => item._id !== employee._id) : [...prev, employee]
//     );
//   };

//   const handleSelectAllChange = () => {
//     if (selectedEmployees.length === employeesData.length) {
//       setSelectedEmployees([]); // Uncheck all if all are selected
//     } else {
//       setSelectedEmployees(employeesData.map(emp => emp)); // Select all
//     }
//   };

//   const isAllSelected = selectedEmployees.length === employeesData.length;
// console.log(selectedEmployees)

//   const sendHandler =async(e)=>{
//     e.preventDefault()
//     let data = {
//       employees:selectedEmployees,
//       date:date,
//       time:time,
//       comment:comment,
//       createdBy:adminId

//     }

//     try{

//       let response = await axios.post('http://localhost:3001/api/schedule/createSchedule',data)
//       console.log(response)

//     }catch(err){
//       console.log(err.message)
//     }

//   }

//   const logoutHandler =()=>{
//     localStorage.removeItem('token')
//     navigate('/')
//   }

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h3>Schedule</h3>
//       <Button variant='contained' onClick={logoutHandler}>Logout</Button>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <Checkbox
//                   checked={isAllSelected}
//                   onChange={handleSelectAllChange}
//                 />
//               </TableCell>
//               <TableCell>Name</TableCell>
//               <TableCell>Email</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {employeesData?.map((emp) => {
//               return (
//                 <TableRow key={emp._id}>
//                   <TableCell>
//                     <Checkbox
//                       onChange={() => handleCheckboxChange(emp)}
//                       checked={selectedEmployees.includes(emp._id)}
//                     />
//                   </TableCell>
//                   <TableCell>{emp.username}</TableCell>
//                   <TableCell>{emp.email}</TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <div>
//       <input
//           type="date"
//           onChange={(e) => setDate(e.target.value)}
//           value={date}
//         />
//         <input
//           type="time"
//           onChange={(e) => setTime(e.target.value)}
//           value={time}
//         />
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           maxLength={200}
//           placeholder="Schedule Comment"
//           rows={4}
//           style={{ width: '100%' }}
//         />
//       </div>
//       <Button onClick={sendHandler} variant='contained'>SUBMIT</Button>
//     </div>
//   );
// }

// export default Schedule;









// // import React,{useState,useEffect} from 'react'
// // import axios from 'axios'
// // import { Table,TableBody,TableRow,TableContainer,TableCell,TableHead } from '@mui/material'
// // function Schedule() {

// //   const[employeesData,setEmployeesData] = useState([])
// //   const[selectedEmployees,setSelectedEmployees] = useState([])
// //   const[date,setDate] = useState('')
// //   const[time,setTime] = useState('')
// //   const[comment,setComment] = useState('')


// //   const fetchUserData = async()=>{
// //     try{
// //       const result = await axios.get('http://localhost:3001/api/user/users');

// //       console.log(result.data.allUsers)
// // setEmployeesData(result.data.allUsers)
// //     }catch(err){
// //       console.log(err.message)
// //     }
// //   }


// //   useEffect(()=>{
// // fetchUserData()
// //   },[])

// //   const handleCheckboxChange = (employeeId) => {
// //     setSelectedEmployees((prev) => 
// //       prev.includes(employeeId) ? prev.filter(id => id !== employeeId) : [...prev, employeeId]
// //     );
// //   };

// //   console.log(selectedEmployees)

// //   console.log(date)
// //   return (
// //     <div style={{textAlign:'center'}}>
// //       <h3>Schedule</h3>
// //       <Table>
// //         <TableHead>
// //           <TableRow>
// //             <TableCell>Select All</TableCell>
// //             <TableCell>Name</TableCell>
// //             <TableCell>Email</TableCell>
// //           </TableRow>
// //         </TableHead>
// //         <TableBody>
// //           <TableRow>
// //             {employeesData?.map((emp)=>{
// //               return(
// //                 <div>
// //                   <TableCell>
// //                   <input type='checkbox' 
// // onChange={()=>handleCheckboxChange(emp._id)}
// // checked={selectedEmployees.includes(emp._id)}
// // />
// //                   </TableCell>
 
// //                   <TableCell>{emp.username}</TableCell>
// //                   <TableCell>{emp.email}</TableCell>
// //                 </div>
// //               )
// //             })}
// //           </TableRow>
// //         </TableBody>
// //       </Table>
// //       <input type="datetime-local" onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().slice(0, 16)} />
// // <textarea
// //         value={comment}
// //         onChange={(e) => setComment(e.target.value)}
// //         maxLength={200}
// //         placeholder="Schedule Comment"
// //       />
// // {/* {employeesData?.map((emp)=>{

// //   return(
// // <div key={emp.id}>
// // <input type='checkbox' 
// // onChange={()=>handleCheckboxChange(emp.id)}
// // checked={selectedEmployees.includes(emp.id)}
// // />
// // <span>{emp.username}</span>
// // <span>{emp.email}</span>
// // <span>{emp.password}</span>
// // </div>
// //   )


// // })} */}



// //     </div>
// //   )
// // }

// // export default Schedule
