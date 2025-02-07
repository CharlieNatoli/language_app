import React, { ReactNode } from "react";

interface Props {
    children: ReactNode; // "children" is a well-understood prop 

}

const Alert = ({ children }: Props) => {
    return (
        <div className="alert alert-primary">{children}</div>
    )
}

export default Alert