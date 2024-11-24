import { Department } from "../models/Department.model.js"
import { Employee } from "../models/Employee.model.js"

export const HandleCreateDepartment = async (req, res) => {
    try {
        const { name, description } = req.body
        const department = await Department.findOne({ name: name })

        if (department) {
            return res.status(400).json({ success: false, message: "Department already exists" })
        }

        const newDepartment = await Department.create({
            name,
            description
        })

        return res.status(200).json({ success: true, message: "Department created successfully", department: newDepartment })
    } catch (error) {

    }
}

export const HandleAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({})
        return res.status(200).json({ success: true, message: "All departments retrieved successfully", departments: departments })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleDepartment = async (req, res) => {
    try {
        const { departmentID } = req.params
        const department = await Department.findById(departmentID)

        if (!department) {
            return res.status(404).json({ success: false, message: "Department not found" })
        }

        return res.status(200).json({ success: true, message: department.name, department: department })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

export const HandleUpdateDepartment = async (req, res) => {
    try {
        const { departmentID, UpdatedDepartment, employeeIDArray } = req.body

        const SelectedDepartment = await Department.findById(departmentID)

        if (!SelectedDepartment) {
            return res.status(404).json({ success: false, message: "Department not found" })
        }

        if (employeeIDArray) {

            const employees = SelectedDepartment.employees

            const SelectedEmployees = []
            const RejectedEmployees = []

            for (let index = 0; index < employeeIDArray.length; index++) {
                if (!employees.includes(employeeIDArray[index])) {
                    SelectedEmployees.push(employeeIDArray[index]);
                }
                else {
                    RejectedEmployees.push(employeeIDArray[index]);
                }
            }

            if (RejectedEmployees.length > 0) {
                return res.status(400).json({ success: false, message: `Some Employees Are Already Belongs To ${SelectedDepartment.name} Department`, EmployeeList: RejectedEmployees })
            }

            for (let index = 0; index < SelectedEmployees.length; index++) {
                employees.push(SelectedEmployees[index])
            }

            await Employee.updateMany({ _id: { $in: SelectedEmployees } }, { $set: { department: departmentID } }) // interesting
            await SelectedDepartment.save()

            return res.status(200).json({ success: true, message: `Employees Added Successfully to ${SelectedDepartment.name} Department`, data: SelectedDepartment })
        }

        const department = await Department.findByIdAndUpdate(departmentID, UpdatedDepartment, { new: true })
        return res.status(200).json({ success: true, message: "Department updated successfully", data: department })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const HandleDeleteDepartment = async (req, res) => {
    try {
        const { departmentID, employeeIDArray, action } = req.body

        if (action === "delete-department") {

            const department = await Department.findById(departmentID)

            if (!department) {
                return res.status(404).json({ success: false, message: "Department not found" })
            }

            await Employee.updateMany({ _id: { $in: department.employees } }, { $set: { department: null } })

            await Department.findByIdAndDelete(departmentID)

            return res.status(200).json({ success: true, message: "Department deleted successfully" })
        }

        if (action === "delete-employee") {

            const department = await Department.findById(departmentID)

            if (!department) {
                return res.status(404).json({ success: false, message: "Department not found" })
            }

            for (let index = 0; index < employeeIDArray.length; index++) {
                department.employees.splice(department.employees.indexOf(employeeIDArray[index]), 1)
            }

            await department.save()

            await Employee.findByIdAndUpdate(employeeIDArray, { $set: { department: null } })

            return res.status(200).json({ success: true, message: "Employee deleted successfully" })
        }


    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}