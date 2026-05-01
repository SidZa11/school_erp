-- View: V_M_UserDetails
SELECT 
    U.ID,
    U.UserID,
    U.Username,
    U.FirstName,
    U.LastName,
    U.Email,
    U.PhoneNumber,
    U.Gender,
    U.DOB,
    R.RoleName,
    U.IsActive,
    U.CreatedDate,
    U.UpdatedDate
FROM M_User U
JOIN M_Role R ON U.RoleID = R.RoleID;

-- View: V_M_SchoolDetails

SELECT 
    S.SchoolID,
    S.SchoolName,
    S.AddressLine1,
    S.AddressLine2,
    C.CityName,
    ST.StateName,
    CO.CountryName,
    S.ContactEmail,
    S.ContactPhone,
    S.IsActive,
    S.CreatedDate,
    S.UpdatedDate
FROM M_School S
JOIN M_City C ON S.CityID = C.CityID
JOIN M_State ST ON S.StateID = ST.StateID
JOIN M_Country CO ON S.CountryID = CO.CountryID;

-- View: V_M_Location

SELECT 
    CI.CityID,
    CI.CityName,
    ST.StateID,
    ST.StateName,
    CO.CountryID,
    CO.CountryName
FROM M_City CI
JOIN M_State ST ON CI.StateID = ST.StateID
JOIN M_Country CO ON ST.CountryID = CO.CountryID;

-- View: V_M_ClassSection

SELECT 
    C.ClassID,
    C.ClassName,
    S.SectionID,
    S.SectionName,
    S.IsActive
FROM M_Class C
JOIN M_Section S ON C.ClassID = S.ClassID;

-- View: V_M_SubjectDetails

SELECT 
    S.SubjectID,
    S.SubjectName,
    D.DepartmentName,
    S.Description,
    S.IsActive,
    S.CreatedDate
FROM M_Subject S
LEFT JOIN M_Department D ON S.DepartmentID = D.DepartmentID;

-- View: V_M_TeacherDetails

SELECT 
    T.TeacherID,
    T.TeacherCode,
    T.FirstName,
    T.LastName,
    T.Email,
    T.PhoneNumber,
    T.Gender,
    T.DOB,
    D.DepartmentName,
    T.Qualification,
    T.JoinDate,
    T.IsActive
FROM M_Teacher T
LEFT JOIN M_Department D ON T.DepartmentID = D.DepartmentID;

-- View: V_M_StudentDetails

SELECT 
    S.StudentID,
    S.StudentCode,
    S.FirstName,
    S.LastName,
    S.DOB,
    S.Gender,
    C.ClassName,
    SE.SectionName,
    AY.AYName,
    S.AdmissionDate,
    S.Email,
    S.PhoneNumber,
    CI.CityName,
    ST.StateName,
    CO.CountryName,
    S.IsActive
FROM M_Student S
JOIN M_Class C ON S.ClassID = C.ClassID
JOIN M_Section SE ON S.SectionID = SE.SectionID
JOIN M_AY AY ON S.AYID = AY.AYID
LEFT JOIN M_City CI ON S.CityID = CI.CityID
LEFT JOIN M_State ST ON S.StateID = ST.StateID
LEFT JOIN M_Country CO ON S.CountryID = CO.CountryID;

-- View: V_M_GradeFeeStructure

SELECT 
    GFS.GradeFeeID,
    AY.AYName,
    G.GradeName,
    FT.FeeTypeName,
    GFS.TotalAmount,
    GFS.IsActive,
    GFS.CreatedDate
FROM M_GradeFeeStructure GFS
JOIN M_AY AY ON GFS.AYID = AY.AYID
JOIN M_Grade G ON GFS.GradeID = G.GradeID
JOIN M_FeeType FT ON GFS.FeeTypeID = FT.FeeTypeID;

-- View: V_M_HolidayList

SELECT 
    HolidayID,
    HolidayDate,
    HolidayName,
    Description,
    IsActive
FROM M_Holiday;
