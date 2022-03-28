-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema academia
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `academia` ;

-- -----------------------------------------------------
-- Schema academia
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `academia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `academia` ;

-- -----------------------------------------------------
-- Table `academia`.`Alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Alumno` (
  `idAlumno` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellidos` VARCHAR(45) NOT NULL,
  `Direccion` VARCHAR(45) NOT NULL,
  `Correo` VARCHAR(45) NOT NULL,
  `Telefono` VARCHAR(45) NOT NULL,
  `DNI` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idAlumno`))
ENGINE = InnoDB
AUTO_INCREMENT = 17
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Profesor` (
  `idProfesor` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Apellidos` VARCHAR(45) NOT NULL,
  `Dirección` VARCHAR(45) NOT NULL,
  `Telefono` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `DNI` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idProfesor`))
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Asignatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Asignatura` (
  `idAsignatura` INT NOT NULL AUTO_INCREMENT,
  `Codigo` VARCHAR(45) NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  `idProfesor` INT NOT NULL,
  PRIMARY KEY (`idAsignatura`),
  INDEX `fk_Asignatura_Profesor1_idx` (`idProfesor` ASC) VISIBLE,
  CONSTRAINT `fk_Asignatura_Profesor1`
    FOREIGN KEY (`idProfesor`)
    REFERENCES `academia`.`Profesor` (`idProfesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Grupo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Grupo` (
  `idGrupo` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Capacidad` VARCHAR(45) NOT NULL,
  `Turno` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGrupo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Aula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Aula` (
  `idAula` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Grupo_idGrupo` INT NOT NULL,
  PRIMARY KEY (`idAula`),
  INDEX `fk_Aula_Grupo1_idx` (`Grupo_idGrupo` ASC) VISIBLE,
  CONSTRAINT `fk_Aula_Grupo1`
    FOREIGN KEY (`Grupo_idGrupo`)
    REFERENCES `academia`.`Grupo` (`idGrupo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Horario_Alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Horario_Alumno` (
  `idHorario_Alumno` INT NOT NULL AUTO_INCREMENT,
  `idAsignatura` INT NOT NULL,
  `idAlumno` INT NOT NULL,
  `Dia` VARCHAR(45) NOT NULL,
  `Hora_inicio` TIME NOT NULL,
  `Hora_fin` TIME NOT NULL,
  PRIMARY KEY (`idHorario_Alumno`),
  INDEX `fk_Horario_Alumno_Asignatura1_idx` (`idAsignatura` ASC) VISIBLE,
  INDEX `fk_Horario_Alumno_Alumno1_idx` (`idAlumno` ASC) VISIBLE,
  CONSTRAINT `fk_Horario_Alumno_Alumno1`
    FOREIGN KEY (`idAlumno`)
    REFERENCES `academia`.`Alumno` (`idAlumno`),
  CONSTRAINT `fk_Horario_Alumno_Asignatura1`
    FOREIGN KEY (`idAsignatura`)
    REFERENCES `academia`.`Asignatura` (`idAsignatura`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`Pagos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`Pagos` (
  `idPagos` INT NOT NULL AUTO_INCREMENT,
  `concepto` VARCHAR(45) NOT NULL,
  `importe` DOUBLE NOT NULL,
  `fecha_pago` DATETIME NOT NULL,
  `Alumno_idAlumno` INT NOT NULL,
  PRIMARY KEY (`idPagos`),
  INDEX `fk_Pagos_Alumno1_idx` (`Alumno_idAlumno` ASC) VISIBLE,
  CONSTRAINT `fk_Pagos_Alumno1`
    FOREIGN KEY (`Alumno_idAlumno`)
    REFERENCES `academia`.`Alumno` (`idAlumno`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`horario_profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`horario_profesor` (
  `idProfesor` INT NOT NULL,
  `idAsignatura` INT NOT NULL,
  `Dia` VARCHAR(45) NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_fin` TIME NOT NULL,
  `Grupo_idGrupo` INT NOT NULL,
  INDEX `fk_horario_profesor_Profesor1_idx` (`idProfesor` ASC) VISIBLE,
  INDEX `fk_horario_profesor_Asignatura1_idx` (`idAsignatura` ASC) VISIBLE,
  INDEX `fk_horario_profesor_Grupo1_idx` (`Grupo_idGrupo` ASC) VISIBLE,
  CONSTRAINT `fk_horario_profesor_Asignatura1`
    FOREIGN KEY (`idAsignatura`)
    REFERENCES `academia`.`Asignatura` (`idAsignatura`),
  CONSTRAINT `fk_horario_profesor_Grupo1`
    FOREIGN KEY (`Grupo_idGrupo`)
    REFERENCES `academia`.`Grupo` (`idGrupo`),
  CONSTRAINT `fk_horario_profesor_Profesor1`
    FOREIGN KEY (`idProfesor`)
    REFERENCES `academia`.`Profesor` (`idProfesor`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `academia`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`user_roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `academia`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `academia`.`users` (
  `idusers` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `DNI` VARCHAR(45) NOT NULL,
  `id_rol` INT NOT NULL,
  `fullname` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusers`),
  INDEX `fk_users_user_roles1_idx` (`id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_users_user_roles1`
    FOREIGN KEY (`id_rol`)
    REFERENCES `academia`.`user_roles` (`id_rol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
insert into user_roles (id_rol, rol) values (1, 'admin');
insert into user_roles (id_rol, rol) values (2, 'profesor');
insert into user_roles (id_rol, rol) values (3, 'alumno');
insert into users (idusers, username, password, DNI, id_rol, fullname) values (1, 'pibol','$2a$10$dEJbgghoPtfqlEC48mJNmuQZXR.vSn5HZgZD9wkWzHpZUTGA6LY2i', '16094053X', 1, 'Pablo');

