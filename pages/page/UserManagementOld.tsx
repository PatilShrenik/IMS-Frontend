import React, { useEffect, useState } from "react";
import { tableData } from "../api/tableData";
import Link from "next/link";
import { getAllTopo } from "../api/getAllTopo";
import CloseIcon from "@mui/icons-material/Close";
import AddBoxIcon from "@mui/icons-material/AddBox";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getAllUsers } from "../api/FinopsApi/GetAllUsers";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
const UserManagementOld = () => {
  const [data, setData] = useState<any>(null);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState<any>(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);
  const [editModalOpen, setEditModalOpen] = useState<any>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredData =
    data &&
    data.filter(
      (d: any) =>
        d.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.adId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        // Add more fields as needed
        (d.subscriptions &&
          d.subscriptions.some((sub: any) =>
            sub.subsContactADIDs[0]?.some(
              (contact: any) =>
                contact.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                contact.adid.toLowerCase().includes(searchQuery.toLowerCase())
            )
          ))
    );

  const totalItems = filteredData && filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData && filteredData.slice(startIndex, endIndex);
  const handleViewDetailsClick = (rowData: any) => {
    // console.log("----------------", rowData);
    setSelectedRowData(rowData);
    setIsViewModalOpen(true);
  };
  // useEffect(() => {
  //   data && setCount(data.length);
  //   increaseCount();
  // }, [data]);
  // const increaseCount = () => {
  //   count && setCount(count + 1 - count);
  // };
  // console.log("countdata", count);

  const handleEditDetailsClick = (rowData: any) => {
    // console.log("----------------", rowData);
    setSelectedRowData(rowData);
    setEditModalOpen(true);
  };

  // let count = 1;
  const [userData, setUserData] = useState({
    businessName: "",
    ownerName: "",
    ownerEmail: "",
    role: "BE",
  });
  // const [contactDetails, setContactDetails] = useState<any>([
  //   { contactName: "", contactEmail: "" },
  // ]);

  // const [subscriptionDetail, setSubscriptionDetail] = useState<any>([
  //   {
  //     cloud: "",
  //     subsAccName: "",
  //     subsAccId: "",
  //     contactDetails: [contactDetails[0]],
  //   },
  // ]);
  const [subscriptionDetail, setSubscriptionDetail] = useState([
    {
      cloud: "",
      subsAccName: "",
      subsAccId: "",
      type: "",
      contactDetails: [{ contactName: "", contactEmail: "" }],
    },
  ]);
  const [editedUserData, setEditedUserData] = useState({
    businessName: "",
    ownerName: "",
    ownerEmail: "",
    role: "BE",
  });

  // const [editedContactDetails, setEditedContactDetails] = useState<any>([
  //   { contactName: "", contactEmail: "" },
  // ]);

  const [editedSubscriptionDetail, setEditedSubscriptionDetail] = useState<any>(
    [
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        contactDetails: [{ contactName: "", contactEmail: "" }],
      },
    ]
  );

  useEffect(() => {
    if (selectedRowData) {
      setEditedUserData({
        businessName: selectedRowData.businessName,
        ownerName: selectedRowData.userName,
        ownerEmail: selectedRowData.adId,
        role: selectedRowData.userRole,
      });
      setEditedSubscriptionDetail((prevData: any) => [
        {
          ...prevData[0],
          contactDetails:
            selectedRowData.subscriptions &&
            selectedRowData.subscriptions.subsContactADIDs &&
            selectedRowData.subscriptions.subsContactADIDs.map(
              (contact: any) => ({
                contactName: contact.name,
                contactEmail: contact.adid,
              })
            ),
        },
      ]);

      setEditedSubscriptionDetail(selectedRowData.subscriptions);
    }
  }, [selectedRowData]);

  // editedSubscriptionDetail &&
  // console.log("edited data", editedSubscriptionDetail);
  const handleEditUserDataChange = (e: any) => {
    const { name, value } = e.target;
    setEditedUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleEditContactChange = (
    subscriptionIndex: any,
    contactIndex: any,
    event: any
  ) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];

    // Destructure the relevant properties
    const { name, value } = event.target;

    // Update the nested structure
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0][contactIndex] =
      {
        ...newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0][
          contactIndex
        ],
        [name]: value,
      };

    // Set the updated state
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditSubscriptionChange = (subscriptionIndex: any, event: any) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex] = {
      ...newSubscriptionDetail[subscriptionIndex],
      [event.target.name]: event.target.value,
    };
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditAddContact = (subscriptionIndex: any) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0] &&
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0].push({
        name: "",
        adid: "",
      });
    if (!newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0]) {
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs = [
        [
          {
            name: "",
            adid: "",
          },
        ],
      ];
    }
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditAddSubscription = () => {
    setEditedSubscriptionDetail([
      ...editedSubscriptionDetail,
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        type: "",
        subsContactADIDs: [[{ name: "", adid: "" }]],
      },
    ]);
  };

  const handleEditRemoveContact = (
    subscriptionIndex: any,
    contactIndex: any
  ) => {
    const newSubscriptionDetail = [...editedSubscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0] &&
      newSubscriptionDetail[subscriptionIndex].subsContactADIDs[0].splice(
        contactIndex,
        1
      );
    setEditedSubscriptionDetail(newSubscriptionDetail);
  };

  const handleEditRemoveSubscription = (subscriptionIndex: any) => {
    const newSubscriptions = editedSubscriptionDetail.filter(
      (_: any, index: any) => index !== subscriptionIndex
    );
    setEditedSubscriptionDetail(newSubscriptions);
  };

  const isFormValid = () => {
    const isBusinessNameValid = userData.businessName.trim() !== "";
    const isOwnerNameValid = userData.ownerName.trim() !== "";
    const isOwnerEmailValid =
      userData.ownerEmail.trim() !== "" && isValidEmail(userData.ownerEmail);

    const areSubscriptionDetailsValid = subscriptionDetail.every(
      (subscription: any) =>
        subscription.cloud.trim() !== "" &&
        subscription.subsAccName.trim() !== "" &&
        subscription.subsAccId.trim() !== "" &&
        subscription.contactDetails.length > 0 &&
        subscription.contactDetails.every(
          (contact: any) =>
            contact.contactName.trim() !== "" &&
            contact.contactEmail.trim() !== "" &&
            isValidEmail(contact.contactEmail)
        ) &&
        (subscription.cloud !== "Azure" ||
          (subscription.cloud === "Azure" && subscription.type.trim() !== ""))
    );

    return (
      isBusinessNameValid &&
      isOwnerNameValid &&
      isOwnerEmailValid &&
      areSubscriptionDetailsValid
    );
  };
  const isEditFormValid = () => {
    // Validate business name
    const isBusinessNameValid = editedUserData.businessName.trim() !== "";

    // Validate owner name
    const isOwnerNameValid = editedUserData.ownerName.trim() !== "";

    // Validate owner email
    const isOwnerEmailValid =
      editedUserData.ownerEmail.trim() !== "" &&
      isValidEmail(editedUserData.ownerEmail);

    // Validate subscription details
    const areSubscriptionDetailsValid = editedSubscriptionDetail.every(
      (subscription: any) =>
        subscription.cloud.trim() !== "" &&
        subscription.subsAccName.trim() !== "" &&
        subscription.subsAccId.trim() !== "" &&
        ((subscription.subsContactADIDs &&
          subscription.subsContactADIDs.length === 0) || // Allow no contact details
          (subscription.subsContactADIDs[0] &&
            subscription.subsContactADIDs[0].length > 0 &&
            subscription.subsContactADIDs[0].every(
              (contact: any) =>
                contact.name.trim() !== "" &&
                contact.adid.trim() !== "" &&
                isValidEmail(contact.adid)
            ))) &&
        (subscription.cloud !== "Azure" ||
          (subscription.cloud === "Azure" &&
            subscription.type &&
            subscription.type.trim() !== ""))
    );

    return (
      isBusinessNameValid &&
      isOwnerNameValid &&
      isOwnerEmailValid &&
      areSubscriptionDetailsValid
    );
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // console.log(isFormValid());

  const handleUserDataChange = (e: any) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubscriptionChange = (subscriptionIndex: any, event: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex] = {
      ...newSubscriptionDetail[subscriptionIndex],
      [event.target.name]: event.target.value,
    };
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleContactChange = (
    subscriptionIndex: any,
    contactIndex: any,
    event: any
  ) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails[contactIndex] = {
      ...newSubscriptionDetail[subscriptionIndex].contactDetails[contactIndex],
      [event.target.name]: event.target.value,
    };
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleAddContact = (subscriptionIndex: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails.push({
      contactName: "",
      contactEmail: "",
    });
    setSubscriptionDetail(newSubscriptionDetail);
  };
  // console.log("subscription detail", subscriptionDetail);
  const handleRemoveContact = (subscriptionIndex: any, contactIndex: any) => {
    const newSubscriptionDetail = [...subscriptionDetail];
    newSubscriptionDetail[subscriptionIndex].contactDetails.splice(
      contactIndex,
      1
    );
    setSubscriptionDetail(newSubscriptionDetail);
  };

  const handleAddSubscription = () => {
    setSubscriptionDetail([
      ...subscriptionDetail,
      {
        cloud: "",
        subsAccName: "",
        subsAccId: "",
        type: "",
        contactDetails: [{ contactName: "", contactEmail: "" }],
      },
    ]);
  };

  const handleRemoveSubscription = (subscriptionIndex: any) => {
    const newSubscriptions = subscriptionDetail.filter(
      (_, index) => index !== subscriptionIndex
    );
    setSubscriptionDetail(newSubscriptions);
  };

  useEffect(() => {
    dataFetch();
  }, []);
  async function dataFetch() {
    const res: any = await getAllUsers().then((res: any) => {
      setData(res);
    });
    // setData(res.data.sort());
  }

  const handleUpload = () => {
    // console.log("userdata", userData);
    // console.log("subscription", subscriptionDetail);
    // console.log("contact", contactDetails);

    const formData = {
      businessName: userData.businessName,
      userName: userData.ownerName,
      adid: userData.ownerEmail,
      role: userData.role,
      type: "",
      status: "active",
      businessLogo: "",
      subscriptions: subscriptionDetail.map((subscription: any) => {
        const subscriptionData: any = {
          subsAccName: subscription.subsAccName,
          subsAccId: subscription.subsAccId,
          cloud: subscription.cloud,
          access: [
            {
              ownerADID: userData.ownerEmail,
            },
            {
              contactADID: [].concat(
                ...subscription.contactDetails.map((contact: any) => ({
                  name: contact.contactName,
                  adid: contact.contactEmail,
                }))
              ),
            },
          ],
        };

        if (subscription.cloud === "Azure") {
          subscriptionData.type = subscription.type;
        }

        return subscriptionData;
      }),
    };

    // console.log(formData);

    // console.log("payload", formData);
  };

  const handleEditUpload = () => {
    // console.log("userdata", userData);
    // console.log("subscription", subscriptionDetail);
    // console.log("contact", contactDetails);

    const formData = {
      businessName: editedUserData.businessName,
      userName: editedUserData.ownerName,
      adid: editedUserData.ownerEmail,
      role: editedUserData.role,
      type: "",
      status: "",
      businessLogo: "",
      subscriptions: editedSubscriptionDetail.map((subscription: any) => {
        const subscriptionData: any = {
          subsAccName: subscription.subsAccName,
          subsAccId: subscription.subsAccId,
          cloud: subscription.cloud,
          access: [
            {
              ownerADID: editedUserData.ownerEmail,
            },
            {
              contactADID:
                subscription.subsContactADIDs[0] &&
                subscription.subsContactADIDs[0].map((contact: any) => ({
                  name: contact.name,
                  adid: contact.adid,
                })),
            },
          ],
          status: "active",
          // type: subscription.type,
        };

        if (subscription.cloud === "Azure") {
          subscriptionData.type = subscription.type;
        }

        return subscriptionData;
      }),
    };

    // console.log(formData);

    // console.log(" edited payload", formData);
  };
  const getFilteredSubscriptions = (cloudType: any) => {
    return selectedRowData.subscriptions.filter(
      (subscription: any) => subscription.cloud === cloudType
    );
  };
  // selectedRowData && console.log("row data", selectedRowData.subscriptions);
  function getContactNames(subsContactADIDs: any, users: any) {
    return subsContactADIDs.map((contactADID: any) => {
      const user = users.find((user: any) => user.adId === contactADID);
      // console.log("emails", subsContactADIDs, users);
      return user ? user.userName : contactADID;
    });
  }
  // console.log("All Topo Data", data);
  return (
    <div className="">
      <div className="text-xl px-4 border-b-2 border-slate-400 pb-2 flex justify-between items-center">
        <span>User Management</span>
      </div>
      <div className="flex justify-between px-4">
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search..."
            className="border px-2 py-1 rounded-sm"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className=" mt-6">
          <button
            onClick={() => setIsOpen(true)}
            className="btn bg-red-700 rounded-sm  px-4 py-1 text-white font-semibold hover:bg-red-800"
          >
            Add User
          </button>
        </div>
      </div>
      <div className="items-center pb-4 px-4 ">
        <div className="relative overflow-x-auto mt-6">
          <table className="w-full text-sm text-center text-gray-800">
            <thead className="text-xs text-white uppercase bg-red-800">
              <tr>
                <th scope="col" className="px-2 py-3">
                  Sr.No.
                </th>
                <th scope="col" className="px-auto py-3">
                  Business Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Owner Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Owner Email
                </th>
                <th scope="col" className="px-auto py-3">
                  Contact Name
                </th>
                <th scope="col" className="px-auto py-3">
                  Contact Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData && currentData.length != 0 ? (
                currentData.map((d: any, i: any) => {
                  if (d.userType === "Owner") {
                    const uniqueContactADIDs = new Set<string>();
                    d.subscriptions &&
                      d.subscriptions.forEach((sub: any) => {
                        sub.subsContactADIDs[0] &&
                          sub.subsContactADIDs[0].forEach((contact: any) => {
                            uniqueContactADIDs.add(JSON.stringify(contact));
                          });
                      });
                    const index = startIndex + i + 1;
                    // console.log("-----------", uniqueContactADIDs);
                    return (
                      <tr key={i} className="bg-white border-b text-center">
                        <td className="px-auto py-3">{index}</td>
                        <td className="px-auto py-3">{d.businessName}</td>
                        <td className="px-auto py-3">{d.userName}</td>
                        <td className="px-auto py-3">{d.adId}</td>{" "}
                        <td className="px-auto py-3">
                          {Array.from(uniqueContactADIDs).map(
                            (contactString: any, index: any) => {
                              const contact = JSON.parse(contactString);
                              return <div key={index}>{contact.name}</div>;
                            }
                          )}
                        </td>
                        {/* Displaying unique adIDs in separate <td> elements */}
                        <td className="px-auto py-3">
                          {Array.from(uniqueContactADIDs).map(
                            (contactString, index) => {
                              const contact = JSON.parse(contactString);
                              return <div key={index}>{contact.adid}</div>;
                            }
                          )}
                        </td>
                        <td className="px-auto py-3 space-x-4">
                          <button onClick={() => handleViewDetailsClick(d)}>
                            <VisibilityIcon />
                          </button>
                          <button onClick={() => handleEditDetailsClick(d)}>
                            <EditIcon />
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <tr className="bg-white border-b text-center ">
                  <td className="px-auto py-3 " colSpan={7}>
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="mt-2 table-pagination w-full flex items-center justify-end gap-2">
            <button
              className="py-1 px-2 rounded border disabled:text-slate-400"
              onClick={() =>
                setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
              }
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="py-1 px-2 rounded border disabled:text-slate-400"
              onClick={() =>
                setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {/* --------------------Add user Modal Start----------------------*/}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="w-full max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">Add New User</h3>
                <button
                  className="p-2 text-2xl text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Business Name Field */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    Business Name :
                  </label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Type here"
                    value={userData.businessName}
                    className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                    onChange={handleUserDataChange}
                    required
                  />
                </div>

                {/* Owner Name and Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Name :
                    </label>
                    <input
                      name="ownerName"
                      type="text"
                      placeholder="Type here"
                      value={userData.ownerName}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleUserDataChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Email :
                    </label>
                    <input
                      name="ownerEmail"
                      type="email"
                      placeholder="Type here"
                      value={userData.ownerEmail}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleUserDataChange}
                      required
                    />
                  </div>
                </div>
                {/* Subscription Details */}
                {subscriptionDetail.map(
                  (subscription: any, subscriptionIndex: any) => (
                    <div key={subscriptionIndex}>
                      <label className="block text-lg font-semibold mb-2">
                        Subscription Details :
                      </label>

                      {/* Cloud and Account Name/ID Fields */}
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <select
                          name="cloud"
                          value={subscription.cloud}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        >
                          <option value="" disabled>
                            Select Cloud
                          </option>
                          <option value="Azure">Azure</option>
                          <option value="AWS">AWS</option>
                        </select>
                        <input
                          type="text"
                          name="subsAccName"
                          value={subscription.subsAccName}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          placeholder="Subscription Account Name"
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        />
                        <input
                          type="text"
                          name="subsAccId"
                          value={subscription.subsAccId}
                          onChange={(event) =>
                            handleSubscriptionChange(subscriptionIndex, event)
                          }
                          placeholder="Subscription Account ID"
                          className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                          required
                        />
                        {subscription.cloud &&
                          subscription.cloud == "Azure" && (
                            <input
                              type="text"
                              name="type"
                              value={subscription.type}
                              onChange={(event) =>
                                handleSubscriptionChange(
                                  subscriptionIndex,
                                  event
                                )
                              }
                              placeholder="Subscription Type"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />
                          )}
                      </div>

                      {/* Contact Details for each Subscription */}
                      {subscription.contactDetails.map(
                        (contact: any, contactIndex: any) => (
                          <div
                            className="grid grid-cols-2 gap-4 mb-2 mt-4"
                            key={contactIndex}
                          >
                            {/* Contact Name */}
                            <input
                              type="text"
                              name="contactName"
                              value={contact.contactName}
                              onChange={(event) =>
                                handleContactChange(
                                  subscriptionIndex,
                                  contactIndex,
                                  event
                                )
                              }
                              placeholder="Contact Name"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />

                            {/* Contact Email */}
                            <input
                              type="email"
                              name="contactEmail"
                              value={contact.contactEmail}
                              onChange={(event) =>
                                handleContactChange(
                                  subscriptionIndex,
                                  contactIndex,
                                  event
                                )
                              }
                              placeholder="Contact Email"
                              className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                              required
                            />
                          </div>
                        )
                      )}

                      {/* Add and Remove Contact Buttons */}
                      <div className="mb-6 flex items-center justify-end">
                        {subscription.contactDetails.length > 1 && (
                          <button
                            onClick={() =>
                              handleRemoveContact(
                                subscriptionIndex,
                                subscription.contactDetails.length - 1
                              )
                            }
                            className="text-red-500 text-xl px-2  hover:text-red-700 ml-2"
                          >
                            -{/* <RemoveCircleOutlineIcon /> */}
                          </button>
                        )}
                        <button
                          onClick={() => handleAddContact(subscriptionIndex)}
                          className="text-blue-500 py-1 px-2 text-xl hover:text-blue-700"
                        >
                          +{/* <AddCircleOutlineIcon /> */}
                        </button>
                      </div>
                    </div>
                  )
                )}

                {/* Add and Remove Subscription Buttons */}
                <div className="mb-6 flex items-center justify-end">
                  {subscriptionDetail.length > 1 && (
                    <button
                      onClick={() =>
                        handleRemoveSubscription(subscriptionDetail.length - 1)
                      }
                      className="text-white px-2 py-1 bg-red-800 rounded hover:bg-red-900 mr-2"
                    >
                      Remove
                      {/* <RemoveCircleOutlineIcon /> */}
                    </button>
                  )}
                  <button
                    onClick={handleAddSubscription}
                    className="text-white px-2 py-1 bg-blue-700 rounded hover:bg-blue-800"
                  >
                    Add Subscription
                    {/* <AddCircleOutlineIcon /> */}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gray-200 px-4 py-3 flex justify-end">
                <button
                  onClick={handleUpload}
                  className={`text-white px-6 py-2 rounded ${
                    isFormValid()
                      ? "bg-red-800 hover:bg-red-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal content */}
          <div className="w-full max-w-3xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">Add New User</h3>
                <button
                  className="p-2 text-2xl text-white"
                  onClick={() => setEditModalOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Business Name Field */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">
                    Business Name :
                  </label>
                  <input
                    name="businessName"
                    type="text"
                    placeholder="Type here"
                    value={editedUserData.businessName}
                    className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                    onChange={handleEditUserDataChange}
                    required
                  />
                </div>

                {/* Owner Name and Email Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Name :
                    </label>
                    <input
                      name="ownerName"
                      type="text"
                      placeholder="Type here"
                      value={editedUserData.ownerName}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleEditUserDataChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg font-semibold mb-2">
                      Owner Email :
                    </label>
                    <input
                      name="ownerEmail"
                      type="email"
                      placeholder="Type here"
                      value={editedUserData.ownerEmail}
                      className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                      onChange={handleEditUserDataChange}
                      required
                    />
                  </div>
                </div>
                {/* Subscription Details */}
                {editedSubscriptionDetail &&
                  editedSubscriptionDetail.map(
                    (subscription: any, subscriptionIndex: any) => (
                      <div key={subscriptionIndex}>
                        {/* <span></span> */}
                        <label className="block text-lg font-semibold mb-2">
                          {subscriptionIndex + 1}
                          {")"} Subscription Details :
                        </label>

                        {/* Cloud and Account Name/ID Fields */}
                        <div className="grid grid-cols-2 gap-4 mb-2">
                          <select
                            name="cloud"
                            value={subscription.cloud}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          >
                            <option value="" disabled>
                              Select Cloud
                            </option>
                            <option value="Azure">Azure</option>
                            <option value="AWS">AWS</option>
                          </select>
                          <input
                            type="text"
                            name="subsAccName"
                            value={subscription.subsAccName}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            placeholder="Subscription Account Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          />
                          <input
                            type="text"
                            name="subsAccId"
                            value={subscription.subsAccId}
                            onChange={(event) =>
                              handleEditSubscriptionChange(
                                subscriptionIndex,
                                event
                              )
                            }
                            placeholder="Subscription Account ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                            required
                          />
                          {subscription.cloud &&
                            subscription.cloud == "Azure" && (
                              <input
                                type="text"
                                name="type"
                                value={subscription.type}
                                onChange={(event) =>
                                  handleEditSubscriptionChange(
                                    subscriptionIndex,
                                    event
                                  )
                                }
                                placeholder="Subscription Type"
                                className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                required
                              />
                            )}
                        </div>

                        {/* Contact Details for each Subscription */}
                        {subscription.subsContactADIDs &&
                          subscription.subsContactADIDs[0] &&
                          subscription.subsContactADIDs[0].map(
                            (contact: any, contactIndex: any) => (
                              <div
                                className="grid grid-cols-2 gap-4 mb-2 mt-4"
                                key={contactIndex}
                              >
                                {/* Contact Details: */}
                                <input
                                  type="text"
                                  name="name"
                                  value={contact.name}
                                  onChange={(event) =>
                                    handleEditContactChange(
                                      subscriptionIndex,
                                      contactIndex,
                                      event
                                    )
                                  }
                                  placeholder="Contact Name"
                                  className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                  required
                                />

                                {/* Contact Email */}
                                <input
                                  type="email"
                                  name="adid"
                                  value={contact.adid}
                                  onChange={(event) =>
                                    handleEditContactChange(
                                      subscriptionIndex,
                                      contactIndex,
                                      event
                                    )
                                  }
                                  placeholder="Contact Email"
                                  className="w-full px-4 py-2 border border-gray-300 rounded shadow"
                                  required
                                />
                              </div>
                            )
                          )}

                        {/* Add and Remove Contact Buttons */}
                        <div className="mb-6 flex items-center justify-end">
                          {subscription.subsContactADIDs &&
                            subscription.subsContactADIDs[0] &&
                            subscription.subsContactADIDs[0].length > 1 && (
                              <button
                                onClick={() =>
                                  handleEditRemoveContact(
                                    subscriptionIndex,
                                    subscription.subsContactADIDs[0].length - 1
                                  )
                                }
                                className="text-red-500 text-xl px-2  hover:text-red-700 ml-2"
                              >
                                -{/* <RemoveCircleOutlineIcon /> */}
                              </button>
                            )}
                          <button
                            onClick={() =>
                              handleEditAddContact(subscriptionIndex)
                            }
                            className="text-blue-500 py-1 px-2 text-xl hover:text-blue-700"
                          >
                            +{/* <AddCircleOutlineIcon /> */}
                          </button>
                        </div>
                      </div>
                    )
                  )}

                {/* Add and Remove Subscription Buttons */}
                <div className="mb-6 flex items-center justify-end">
                  {editedSubscriptionDetail.length > 1 && (
                    <button
                      onClick={() =>
                        handleEditRemoveSubscription(
                          editedSubscriptionDetail.length - 1
                        )
                      }
                      className="text-white px-2 py-1 bg-red-800 rounded hover:bg-red-900 mr-2"
                    >
                      Remove
                      {/* <RemoveCircleOutlineIcon /> */}
                    </button>
                  )}
                  <button
                    onClick={handleEditAddSubscription}
                    className="text-white px-2 py-1 bg-blue-700 rounded hover:bg-blue-800"
                  >
                    Add Subscription
                    {/* <AddCircleOutlineIcon /> */}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="bg-gray-200 px-4 py-3 flex justify-end">
                <button
                  onClick={handleEditUpload}
                  className={`text-white px-6 py-2 rounded ${
                    isEditFormValid()
                      ? "bg-red-800 hover:bg-red-900"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!isEditFormValid()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-4xl mx-auto my-12 bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-red-800 px-4 py-2 flex items-center justify-between">
                <h3 className="text-xl text-white font-bold">
                  Subscription Details
                </h3>
                <button
                  className="p-2 text-xl text-white"
                  onClick={() => setIsViewModalOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <div className="p-6">
                {/* Display Subscription Details */}
                {selectedRowData && (
                  <div>
                    <h2 className="text-xl font-semibold border-b-2 mb-4">
                      {selectedRowData.businessName} Subscriptions
                    </h2>
                    {getFilteredSubscriptions("Azure").length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-2">
                          Azure Subscriptions:
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-2">Sr.No.</th>
                              <th className="px-4 py-2">Subscription ID</th>
                              <th className="px-4 py-2">Subscription Name</th>
                              <th className="px-4 py-2">Contacts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredSubscriptions("Azure").map(
                              (subscription: any, index: any) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccId}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccName}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsContactADIDs[0].map(
                                      (d: any, i: any) => (
                                        <span key={i}>
                                          {d.adid}
                                          <br />
                                        </span>
                                      )
                                    )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {getFilteredSubscriptions("AWS").length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          AWS Subscriptions:
                        </h3>
                        <table className="w-full">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="px-4 py-2">Sr.No.</th>
                              <th className="px-4 py-2">Subscription ID</th>
                              <th className="px-4 py-2">Subscription Name</th>
                              <th className="px-4 py-2">Contacts</th>
                            </tr>
                          </thead>
                          <tbody>
                            {getFilteredSubscriptions("AWS").map(
                              (subscription: any, index: any) => (
                                <tr key={index}>
                                  <td className="border px-4 py-2 text-center">
                                    {index + 1}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccId}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsAccName}
                                  </td>
                                  <td className="border px-4 py-2 text-center">
                                    {subscription.subsContactADIDs[0] &&
                                      subscription.subsContactADIDs[0].map(
                                        (d: any, i: any) => (
                                          <span key={i}>
                                            {d.adid}
                                            <br />
                                          </span>
                                        )
                                      )}
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagementOld;
