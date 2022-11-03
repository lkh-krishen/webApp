import React from "react";
import driverStyles from "../../assets/css/DriverDetails.module.css";

import TablePagination from "@material-ui/core/TablePagination";



import {
  Label,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormGroup,
  Alert,
  Container,
} from "reactstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";


import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const ref = React.createRef();

function ViewInspectors() {
 

  const [inspectors, setinspectors] = useState([]);
  const [checkName, setcheckName] = useState(true);
  const [checkCity, setcheckCity] = useState(false);
 
  const [searchText, setsearchText] = useState("");

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);



  const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };



  const handleChangeRowsPerPage = (event) => {

    console.log(event.target.value);

    setRowsPerPage(+event.target.value);

    setPage(0);

  };

  const deleteInspector = (inspector) => {
   
    if (
      window.confirm(
        "Inspector " +
       
          " (" +
          inspector.Name +
          
          ") " +
          "will be removed from the database"
      )
    ) {
      axios
        .delete(`http://localhost:8078/inspectors/delete/${inspector.name}`)
        .then((res) => {
          console.log(res);
          toast.success("Inspector deleted!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 5000,
            hideProgressBar: false,
          });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong :(", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 10000,
            hideProgressBar: false,
          });
        });
      let filteredInspectors = inspectors.filter((iid) => iid !== inspector);
      setinspectors(filteredInspectors);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8078/inspectors/details")
      .then((res) => {
        setinspectors(res.data);
      })
      .catch((err) => {
        alert("Something went wrong :(");
        console.log(err);
      });

    return () => {
      // cleanup
    };
  }, []);

  let history = useHistory();
 

  
  return (
    <>
     
      <Container>
      <div className={driverStyles.viewdriverDiv} >
        <center><h3 className={driverStyles.header}>Inspectors' Details</h3></center>
        <br />
        <br />
        <Row>
          <Col>
            <FormGroup>
              <InputGroup className="form-group-no-border">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Search "
                  type="text"
                  value={searchText}
                  onChange={(e) => {
                    setsearchText(e.target.value);
                  }}
                />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col>
            <div>
              <Label check>
                <Input
                  type="checkbox"
                  checked={checkName}
                  onChange={() => {
                    setcheckName(!checkName);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>Name</label>
              </Label>

              <Label check>
                <Input
                  type="checkbox"
                  checked={checkCity}
                  onChange={() => {
                    setcheckCity(!checkCity);
                  }}
                />{" "}
                <label className={driverStyles.checkBoxLabel}>City</label>
              </Label>

             
            </div>
          </Col>
          <Col></Col>
        </Row>
        <table width="100%" border="2px" className={driverStyles.tbldata}>
          <tr>
            <th className={driverStyles.tbldata}>Name</th>
            <th className={driverStyles.tbldata}>Email</th>
            <th className={driverStyles.tbldata}>Phone Number</th>
            <th className={driverStyles.tbldata}>City</th>
            <th className={driverStyles.tbldata2}>Actions</th>
          </tr>
          {inspectors
            .filter((inspector) => {
              let fullName = inspector.Name ;
              if (searchText === "") {
                return inspector;
              } else {
                if (checkName) {
                  if (
                    fullName.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return inspector;
                  }
                }
                if (checkCity) {
                  if (
                    inspector.city
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  ) {
                    return inspector;
                  }
                }
                
                
              }
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((inspector) => (
              <tr className={driverStyles.tbldata}>
                <td className={driverStyles.tbldata}>{inspector.name}</td>
                <td className={driverStyles.tbldata}>{inspector.email}</td>
                <td className={driverStyles.tbldata}>{inspector.phoneNumber}</td>
                <td className={driverStyles.tbldata}>{inspector.city}</td>
                <td className={driverStyles.tbldata}>
                  <button
                    className={driverStyles.btnEdit}
                    onClick={() => {
                      //     handleEdit(driver);
                      history.push(`/inspectorEdit/${inspector._id}`);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className={driverStyles.btnDelete}
                    onClick={() => {
                      deleteInspector(inspector);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </table>

       
        
        <TablePagination

          rowsPerPageOptions={[1, 2, 4, 10]}

          component="div"

          count={inspectors.length}

          rowsPerPage={rowsPerPage}

          page={page}

          onPageChange={handleChangePage}

          onRowsPerPageChange={handleChangeRowsPerPage}

        />
        

      </div>
      
      </Container>
     
    </>
  );
}

export default ViewInspectors;
