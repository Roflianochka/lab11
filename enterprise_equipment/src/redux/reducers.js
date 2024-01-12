const initialState = {
  employees: [],
  enterprises: [],
  inspections: [],
  questions: [],
  commissions: [],
  user: { fullname: "", nickname: "", email: "", bio: "" },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES":
      return { ...state, employees: action.payload };
    case "ADD_EMPLOYEE":
      return { ...state, employees: [...state.employees, action.payload] };
    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case "UPDATE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        ),
      };
    case "SET_ENTERPRISES":
      return { ...state, enterprises: action.payload };
    case "ADD_ENTERPRISE":
      return { ...state, enterprises: [...state.enterprises, action.payload] };
    case "DELETE_ENTERPRISE":
      return {
        ...state,
        enterprises: state.enterprises.filter(
          (enterprise) => enterprise.id !== action.payload
        ),
      };
    case "SET_INSPECTIONS":
      return { ...state, inspections: action.payload };
    case "SET_QUESTIONS":
      return { ...state, questions: action.payload };

    case "SET_COMMISSIONS":
      return { ...state, commissions: [...action.payload] };

    case "ADD_COMMISSION":
      return { ...state, commissions: [...state.commissions, action.payload] };
    case "DELETE_COMMISSION":
      return {
        ...state,
        commissions: state.commissions.filter(
          (commission) => commission.id !== action.payload
        ),
      };
    case "UPDATE_COMMISSION":
      return {
        ...state,
        commissions: state.commissions.map((commission) =>
          commission.id === action.payload.id ? action.payload : commission
        ),
      };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "CLEAR_USER":
      return {
        ...state,
        user: { fullname: "", nickname: "", email: "", bio: "" },
      };
    default:
      return state;
  }
};

export default rootReducer;
