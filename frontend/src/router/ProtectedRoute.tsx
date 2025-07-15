import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * Интерфейс для пропсов компонента ProtectedRoute
 * @interface ProtectedRouteProps
 * @property {React.ReactNode} [children] - Дочерние компоненты, которые будут отрендерены при наличии авторизации. Если не переданы, рендерится Outlet.
 */
interface ProtectedRouteProps {
    children?: React.ReactNode;
}

/**
 * Компонент ProtectedRoute для защиты маршрутов в приложении
 * @description Проверяет наличие токена авторизации в localStorage. Если пользователь авторизован, рендерит дочерние компоненты или Outlet. В противном случае перенаправляет на страницу логина.
 * @param {ProtectedRouteProps} props - Пропсы компонента
 * @returns {JSX.Element} Возвращает либо дочерние компоненты/Outlet (если авторизован), либо перенаправление на /login
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const isAuthenticated = !!localStorage.getItem('temporaryToken');

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;