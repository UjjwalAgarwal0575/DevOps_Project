import { useNavigate } from "react-router-dom"

const AdminDashboard = () => {

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const handleAddProblem = () => {
        routeChange("/add-question");
    }   

    const handleDeleteProblem = () => {
        routeChange("/delete-question");
    }

    const handleUpdateProblem = () => {
        routeChange("/update-question");
    }

    return (
        <>
        <div className="problem-section" style={{marginTop: "5%"}}>
            <div className="problem-list" style={{padding: "30px", fontSize: "30px"}} onClick={handleAddProblem}>Add a Problem</div>
            <div className="problem-list" style={{padding: "30px", fontSize: "30px"}} onClick={handleUpdateProblem}>Update a Problem</div>
            <div className="problem-list" style={{padding: "30px", fontSize: "30px"}} onClick={handleDeleteProblem}>Delete a Problem</div>
        </div>
        </>
    );
}


export default AdminDashboard;