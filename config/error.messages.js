'use strict';

const errorMessages = {
    SERVER_ERROR: "Oops..Server error!!! Please conctact the system admin",
    NOT_FOUND: "The submitted request can not be understood",
    UNPARSABLE_REQUEST: "Can not parse the request. Please try again with correct format",
    USER_NOT_FOUND: "The user requested not found",
    USER_DATA_INVALID: "User data must be in json format and adhere to the spec",
    USER_DATA_USERNAME_INVALID: "userName must have at least 3 characters",
    USER_DATA_FIRSTNAME_INVALID: "firstName must not be empty",
    USER_DATA_LASTNAME_INVALID: "lastName must not be empty",
    USER_USERNAME_TAKEN: "The user name is taken. Please choose another.",
    POST_DATA_TITLE_INVALID: "Title must not be empty",
    POST_DATA_CONTENT_INVALID: "Content must not be empty",
    POST_DATA_INVALID: "Post data must be in json format and adhere to the spec",
    POST_ID_INVALID: "Post id must be UUID v4",
    POST_NOT_FOUND: "The post requested not found",
};
export default errorMessages;
