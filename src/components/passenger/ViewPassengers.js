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

function ViewPassengers() {
  const [passengers, setPassengers] = useState([]);
  const [checkName, setCheckName] = useState(true);
  const [checkType, setCheckType] = useState(false);

  const [searchText, setSearchText] = useState("");

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

  const deletePassenger = (passenger) => {
    if (
      window.confirm(
        "Passenger " +
          " (" +
          passenger.Name +
          ") " +
          "will be removed from the database"
      )
    ) {
      axios
        .delete(`http://localhost:8078/passengers/delete/${passenger.name}`)
        .then((res) => {
          console.log(res);
          toast.success("Passenger deleted!", {
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
      let filteredPassengers = passengers.filter((pid) => pid !== passenger);
      setPassengers(filteredPassengers);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8078/passengers/get")
      .then((res) => {
        setPassengers(res.data);
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
        <div className={driverStyles.viewdriverDiv}>
          <center>
            <h3 className={driverStyles.header}>Passengers' Details</h3>
          </center>
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
                      setSearchText(e.target.value);
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
                      setCheckName(!checkName);
                    }}
                  />{" "}
                  <label className={driverStyles.checkBoxLabel}>Name</label>
                </Label>

                <Label check>
                  <Input
                    type="checkbox"
                    checked={checkType}
                    onChange={() => {
                      setCheckType(!checkType);
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
              <th className={driverStyles.tbldata}>Type</th>
              <th className={driverStyles.tbldata}>Card Type</th>
              <th className={driverStyles.tbldata}>Status</th>
              <th className={driverStyles.tbldata2}>Actions</th>
            </tr>
            {passengers
              .filter((passenger) => {
                let fullName = passenger.Name;
                if (searchText === "") {
                  return passenger;
                } else {
                  if (checkName) {
                    if (
                      fullName.toLowerCase().includes(searchText.toLowerCase())
                    ) {
                      return passenger;
                    }
                  }
                  if (checkType) {
                    if (
                      passenger.type
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                    ) {
                      //return type;
                    }
                  }
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((passenger) => (
                <tr className={driverStyles.tbldata}>
                  <td className={driverStyles.tbldata}>{passenger.name}</td>
                  <td className={driverStyles.tbldata}>{passenger.email}</td>
                  <td className={driverStyles.tbldata}>{passenger.type}</td>
                  <td className={driverStyles.tbldata}>{passenger.cardType}</td>
                  <td className={driverStyles.tbldata}>{passenger.status}</td>
                  <td className={driverStyles.tbldata}>
                    <button
                      className={driverStyles.btnEdit}
                      onClick={() => {
                        //     handleEdit(driver);
                        history.push(`/adminPannel/editUser/${passenger._id}`);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className={driverStyles.btnDelete}
                      onClick={() => {
                        deletePassenger(passenger);
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
            count={passengers.length}
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

export default ViewPassengers;
