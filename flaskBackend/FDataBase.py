


class FDataBase:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def getCatalog(self):
        sql = '''SELECT * FROM catalog'''
        try:
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print("Ошибка чтения из БД getCatalog")
        return []

    def getTableName(self):
        sql = '''SELECT name FROM sqlite_master WHERE type='table';'''
        try:
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print("Ошибка чтения из БД--- getTableName")
        return []

    def getData(self):
        sql = '''SELECT * FROM data'''
        try:
            self.__cur.execute(sql)
            res = self.__cur.fetchall()
            if res: return res
        except:
            print("Ошибка чтения из БД getData")
        return []


