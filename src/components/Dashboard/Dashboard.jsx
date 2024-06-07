// // components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import { getAllProducts } from '../../services/apiService';

// const Dashboard = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const products = await getAllProducts();
//         setProducts(products);
//         setLoading(false);
//       } catch (error) {
//         setError(error);
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     console.log(error);
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <>
//       <h1>Product List</h1>
//       <ul>
//         {products.map((product) => (
//           <li key={product._id}>
//             <h2>{product.title}</h2>
//             <img src={product.image} alt={product.title} />
//             <p>{product.description}</p>
//             <p>Price: ${product.price}</p>
//             <p>Rating: {product.rating}</p>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default Dashboard;
import React from 'react';
import Sidebar from './Sidebar';
import Navbar from '../Navbar';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; 
import "../../CSS/Dashboard.css"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import { useDispatch,useSelector } from 'react-redux';
import LoginPage from '../Login';

const Dashboard = () => {
  const userDetails = useSelector((state) => state.auth.user);
  console.log(userDetails);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        tension: 0.4, // Increase this value to make the line more curvy
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      }
    }
  };

  return (
    <>
    {
      userDetails ? (
        <>
        <Navbar />
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 chart_container' >
               <Line data={data} options={options} />
              </div>
              <div className='col-md-6'>
              <Card className='container-fluid'>
                <Card.Header className='notification_card_header'>Notifications
                <Nav fill variant="tabs">
                <Nav.Item>
                  <Nav.Link>All</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-1">Customer</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="link-2">Vendor</Nav.Link>
                </Nav.Item>
              </Nav>
                </Card.Header>
                <Card.Body>
                
                <ListGroup variant="flush">
                  <ListGroup.Item>Cras justo odio</ListGroup.Item>
                  <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                  <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                </Card.Body>
                
              </Card>
              </div>
            </div>
          </div>
          
        </div>
      </div>
        </>
      ):(
        <>
        <LoginPage />
        </>
      )
    }
      
    </>
  );
};

export default Dashboard;


