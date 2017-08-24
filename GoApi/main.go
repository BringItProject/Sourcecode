package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"goji.io"
	"goji.io/pat"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func ErrorWithJSON(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	fmt.Fprintf(w, "{message: %q}", message)
}

func ResponseWithJSON(w http.ResponseWriter, json []byte, code int) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(code)
	w.Write(json)
}

type Book struct {
	ISBN    string   `json:"isbn"`
	Title   string   `json:"title"`
	Authors []string `json:"authors"`
	Price   string   `json:"price"`
}

type BringerJob struct {
	JobID      string `json:"jobid"`
	BringerID  string `json:"bringerid"`
	StartPoint string `json:"startpoint"`
	StopPoint  string `json:"stoppoint"`
	Status     string `json:"status"`
	ItemCount  int    `json:"itemcount"`
	JobDate    string `json:"jobdate"`
	JobDueDate string `json:"jobduedate"`
}

type Point struct {
	Type        string    `bson:"type"`
	Coordinates []float64 `bson:"coordinates"`
}

type BringerJobDetail struct {
	JobID     string  `json:"jobid"`
	BringerID string  `json:"bringerid"`
	LegsNo    int     `json:"legsno"`
	PointSeq  int     `json:"pointseq"`
	Distance  float64 `json:"distance"`
	Loc       Point   `json:"loc"`
}

type SenderJob struct {
	JobID      string `json:"jobid"`
	BringerID  string `json:"bringerid"`
	StartPoint string `json:"startpoint"`
	StopPoint  string `json:"stoppoint"`
	Status     string `json:"status"`
	ItemCount  int    `json:"itemcount"`
	JobDate    string `json:"jobdate"`
	JobDueDate string `json:"jobduedate"`
}

type SenderJobDetail struct {
	JobID    string  `json:"jobid"`
	SenderID string  `json:"senderid"`
	LegsNo   int     `json:"legsno"`
	PointSeq int     `json:"pointseq"`
	Distance float64 `json:"distance"`
	Loc      Point   `json:"loc"`
}

func main() {
	session, err := mgo.Dial("localhost")
	if err != nil {
		panic(err)
	}
	defer session.Close()

	session.SetMode(mgo.Monotonic, true)
	ensureIndex(session)

	mux := goji.NewMux()

	mux.HandleFunc(pat.Get("/BringerJob"), allBringerJob(session))
	mux.HandleFunc(pat.Post("/BringerJob"), addBringerJob(session))
	mux.HandleFunc(pat.Get("/BringerJob/:jobid"), bringerJobByJobID(session))
	mux.HandleFunc(pat.Put("/BringerJob/:jobid"), updateBringerJob(session))
	mux.HandleFunc(pat.Delete("/BringerJob/:jobid"), deleteBringerJob(session))

	mux.HandleFunc(pat.Get("/BringerJobDetail"), allBringerJobDetail(session))
	mux.HandleFunc(pat.Post("/BringerJobDetail"), addBringerJobDetail(session))
	mux.HandleFunc(pat.Get("/BringerJobDetail/:jobid"), bringerJobDetailByJobID(session))
	mux.HandleFunc(pat.Put("/BringerJobDetail/:jobid"), updateBringerJobDetail(session))
	mux.HandleFunc(pat.Delete("/BringerJobDetail/:jobid"), deleteBringerJobDetail(session))

	mux.HandleFunc(pat.Get("/SenderJob"), allSenderJob(session))
	mux.HandleFunc(pat.Post("/SenderJob"), addSenderJob(session))
	mux.HandleFunc(pat.Get("/SenderJob/:jobid"), senderJobByJobID(session))
	mux.HandleFunc(pat.Put("/SenderJob/:jobid"), updateSenderJob(session))
	mux.HandleFunc(pat.Delete("/SenderJob/:jobid"), deleteSenderJob(session))

	mux.HandleFunc(pat.Get("/SenderJobDetail"), allSenderJobDetail(session))
	mux.HandleFunc(pat.Post("/SenderJobDetail"), addSenderJobDetail(session))
	mux.HandleFunc(pat.Get("/SenderJobDetail/:jobid"), senderJobDetailByJobID(session))
	mux.HandleFunc(pat.Put("/SenderJobDetail/:jobid"), updateSenderJobDetail(session))
	mux.HandleFunc(pat.Delete("/SenderJobDetail/:jobid"), deleteSenderJobDetail(session))

	mux.HandleFunc(pat.Get("/books"), allBooks(session))
	mux.HandleFunc(pat.Post("/books"), addBook(session))
	mux.HandleFunc(pat.Get("/books/:isbn"), bookByISBN(session))
	mux.HandleFunc(pat.Put("/books/:isbn"), updateBook(session))
	mux.HandleFunc(pat.Delete("/books/:isbn"), deleteBook(session))

	//http.ListenAndServe("localhost:8080", mux)
	http.ListenAndServe(":8080", mux)
}

func ensureIndex(s *mgo.Session) {
	// session := s.Copy()
	// defer session.Close()

	// c := session.DB("store").C("books")

	// index := mgo.Index{
	// 	Key:        []string{"isbn"},
	// 	Unique:     true,
	// 	DropDups:   true,
	// 	Background: true,
	// 	Sparse:     true,
	// }
	// err := c.EnsureIndex(index)
	// if err != nil {
	// 	panic(err)
	// }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///Book
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func allBooks(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("store").C("books")

		var books []Book
		err := c.Find(bson.M{}).All(&books)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all books: ", err)
			return
		}

		respBody, err := json.MarshalIndent(books, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var book Book
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("store").C("books")

		err = c.Insert(book)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert book: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+book.ISBN)
		w.WriteHeader(http.StatusCreated)
	}
}

func bookByISBN(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		isbn := pat.Param(r, "isbn")

		c := session.DB("store").C("books")

		var book Book
		err := c.Find(bson.M{"isbn": isbn}).One(&book)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed find book: ", err)
			return
		}

		if book.ISBN == "" {
			ErrorWithJSON(w, "Book not found", http.StatusNotFound)
			return
		}

		respBody, err := json.MarshalIndent(book, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func updateBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		isbn := pat.Param(r, "isbn")

		var book Book
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&book)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("store").C("books")

		err = c.Update(bson.M{"isbn": isbn}, &book)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update book: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "Book not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteBook(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		isbn := pat.Param(r, "isbn")

		c := session.DB("store").C("books")

		err := c.Remove(bson.M{"isbn": isbn})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete book: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "Book not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  BringerJob
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func allBringerJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("bringit").C("bringerjob")

		var bringerJob []BringerJob
		err := c.Find(bson.M{}).All(&bringerJob)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all BringerJob: ", err)
			return
		}

		respBody, err := json.MarshalIndent(bringerJob, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addBringerJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var bringerJob BringerJob
		err := json.NewDecoder(r.Body).Decode(&bringerJob)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("bringerjob")

		err = c.Insert(bringerJob)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert BringerJob: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+bringerJob.JobID)
		w.WriteHeader(http.StatusCreated)

	}
}

func bringerJobByJobID(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("bringerjob")

		var bringerjob BringerJob
		err := c.Find(bson.M{"jobid": jobid}).One(&bringerjob)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed find bringerjob: ", err)
			return
		}

		if bringerjob.JobID == "" {
			ErrorWithJSON(w, "Bringerjob not found", http.StatusNotFound)
			return
		}

		respBody, err := json.MarshalIndent(bringerjob, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func updateBringerJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		var bringerjob BringerJob
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&bringerjob)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("bringerjob")

		err = c.Update(bson.M{"jobid": jobid}, &bringerjob)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update bringerjob: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "bringerjob not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteBringerJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("bringerjob")

		err := c.Remove(bson.M{"jobid": jobid})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete BringerJob: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "BringerJob not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  BringerJobDetailDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func allBringerJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("bringit").C("bringerJobDetail")

		var bringerJobDetail []BringerJobDetail
		err := c.Find(bson.M{}).All(&bringerJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all BringerJobDetail: ", err)
			return
		}

		respBody, err := json.MarshalIndent(bringerJobDetail, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addBringerJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var bringerJobDetail BringerJobDetail
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&bringerJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("bringerJobDetail")

		err = c.Insert(bringerJobDetail)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert BringerJobDetail: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+bringerJobDetail.JobID)
		w.WriteHeader(http.StatusCreated)
	}
}

func bringerJobDetailByJobID(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("bringerJobDetail")

		var bringerJobDetail BringerJobDetail
		err := c.Find(bson.M{"jobid": jobid}).One(&bringerJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed find bringerJobDetail: ", err)
			return
		}

		if bringerJobDetail.JobID == "" {
			ErrorWithJSON(w, "BringerJobDetail not found", http.StatusNotFound)
			return
		}

		respBody, err := json.MarshalIndent(bringerJobDetail, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func updateBringerJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		var bringerJobDetail BringerJobDetail
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&bringerJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("bringerJobDetail")

		err = c.Update(bson.M{"jobid": jobid}, &bringerJobDetail)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update bringerJobDetail: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "bringerJobDetail not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteBringerJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("bringerJobDetail")

		err := c.Remove(bson.M{"jobid": jobid})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete BringerJobDetail: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "BringerJobDetail not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  SenderJob
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func allSenderJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("bringit").C("senderjob")

		var senderJob []SenderJob
		err := c.Find(bson.M{}).All(&senderJob)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all SenderJob: ", err)
			return
		}

		respBody, err := json.MarshalIndent(senderJob, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addSenderJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var senderJob SenderJob
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&senderJob)

		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("senderjob")

		err = c.Insert(senderJob)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert SenderJob: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+senderJob.JobID)
		w.WriteHeader(http.StatusCreated)
	}
}

func senderJobByJobID(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("senderjob")

		var senderjob SenderJob
		err := c.Find(bson.M{"jobid": jobid}).One(&senderjob)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed find senderjob: ", err)
			return
		}

		if senderjob.JobID == "" {
			ErrorWithJSON(w, "Senderjob not found", http.StatusNotFound)
			return
		}

		respBody, err := json.MarshalIndent(senderjob, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func updateSenderJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		var senderjob SenderJob
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&senderjob)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("senderjob")

		err = c.Update(bson.M{"jobid": jobid}, &senderjob)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update senderjob: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "senderjob not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteSenderJob(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("senderjob")

		err := c.Remove(bson.M{"jobid": jobid})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete SenderJob: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "SenderJob not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///  SenderJobDetailDetail
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
func allSenderJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		c := session.DB("bringit").C("senderJobDetail")

		var senderJobDetail []SenderJobDetail
		err := c.Find(bson.M{}).All(&senderJobDetail)

		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed get all SenderJobDetail: ", err)
			return
		}

		respBody, err := json.MarshalIndent(senderJobDetail, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func addSenderJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		var senderJobDetail SenderJobDetail
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&senderJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("senderJobDetail")

		err = c.Insert(senderJobDetail)
		if err != nil {
			if mgo.IsDup(err) {
				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
				return
			}

			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed insert SenderJobDetail: ", err)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Location", r.URL.Path+"/"+senderJobDetail.JobID)
		w.WriteHeader(http.StatusCreated)
	}
}

func senderJobDetailByJobID(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("senderJobDetail")

		var senderJobDetail SenderJobDetail
		err := c.Find(bson.M{"jobid": jobid}).One(&senderJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
			log.Println("Failed find senderJobDetail: ", err)
			return
		}

		if senderJobDetail.JobID == "" {
			ErrorWithJSON(w, "SenderJobDetail not found", http.StatusNotFound)
			return
		}

		respBody, err := json.MarshalIndent(senderJobDetail, "", "  ")
		if err != nil {
			log.Fatal(err)
		}

		ResponseWithJSON(w, respBody, http.StatusOK)
	}
}

func updateSenderJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		var senderJobDetail SenderJobDetail
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&senderJobDetail)
		if err != nil {
			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
			return
		}

		c := session.DB("bringit").C("senderJobDetail")

		err = c.Update(bson.M{"jobid": jobid}, &senderJobDetail)
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed update senderJobDetail: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "senderJobDetail not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

func deleteSenderJobDetail(s *mgo.Session) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		session := s.Copy()
		defer session.Close()

		jobid := pat.Param(r, "jobid")

		c := session.DB("bringit").C("senderJobDetail")

		err := c.Remove(bson.M{"jobid": jobid})
		if err != nil {
			switch err {
			default:
				ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
				log.Println("Failed delete SenderJobDetail: ", err)
				return
			case mgo.ErrNotFound:
				ErrorWithJSON(w, "SenderJobDetail not found", http.StatusNotFound)
				return
			}
		}

		w.WriteHeader(http.StatusNoContent)
	}
}

// func addBringerJobDetailByJob(s *mgo.Session,BringerStartPoint string,BringerStopPoint string) {
// 		session := s.Copy()
// 		defer session.Close()

// 		var bringerJobDetail BringerJobDetail
// 		decoder := json.NewDecoder(r.Body)
// 		err := decoder.Decode(&bringerJobDetail)
// 		if err != nil {
// 			ErrorWithJSON(w, "Incorrect body", http.StatusBadRequest)
// 			return
// 		}

// 		c := session.DB("bringit").C("bringerJobDetail")

// 		err = c.Insert(bringerJobDetail)
// 		if err != nil {
// 			if mgo.IsDup(err) {
// 				ErrorWithJSON(w, "Book with this ISBN already exists", http.StatusBadRequest)
// 				return
// 			}

// 			ErrorWithJSON(w, "Database error", http.StatusInternalServerError)
// 			log.Println("Failed insert BringerJobDetail: ", err)
// 			return
// 		}

// 		w.Header().Set("Content-Type", "application/json")
// 		w.Header().Set("Location", r.URL.Path+"/"+bringerJobDetail.JobID)
// 		w.WriteHeader(http.StatusCreated)
// 	}
// }
