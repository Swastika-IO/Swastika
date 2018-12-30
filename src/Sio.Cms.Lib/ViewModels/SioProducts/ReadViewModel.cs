using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Sio.Cms.Lib.Models.Cms;
using Sio.Cms.Lib.Services;
using Sio.Common.Helper;
using Sio.Domain.Core.ViewModels;
using Sio.Domain.Data.ViewModels;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static Sio.Cms.Lib.SioEnums;

namespace Sio.Cms.Lib.ViewModels.SioProducts
{
    public class ReadListItemViewModel
       : ViewModelBase<SioCmsContext, SioProduct, ReadListItemViewModel>
    {
        #region Properties

        #region Models

        [JsonProperty("id")]
        public int Id { get; set; }

        [JsonProperty("template")]
        public string Template { get; set; }

        [JsonProperty("thumbnail")]
        public string Thumbnail { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }

        [JsonIgnore]
        [JsonProperty("extraProperties")]
        public string ExtraProperties { get; set; } = "[]";

        [JsonProperty("price")]
        public double Price { get; set; }

        [JsonProperty("priceUnit")]
        public string PriceUnit { get; set; }

        [JsonProperty("icon")]
        public string Icon { get; set; }

        [Required]
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("excerpt")]
        public string Excerpt { get; set; }

        [JsonProperty("content")]
        public string Content { get; set; }

        [JsonProperty("seoName")]
        public string SeoName { get; set; }

        [JsonProperty("seoTitle")]
        public string SeoTitle { get; set; }

        [JsonProperty("seoDescription")]
        public string SeoDescription { get; set; }

        [JsonProperty("seoKeywords")]
        public string SeoKeywords { get; set; }

        [JsonProperty("source")]
        public string Source { get; set; }

        [JsonProperty("views")]
        public int? Views { get; set; }

        [JsonProperty("type")]
        public int Type { get; set; }

        [JsonProperty("createdDateTime")]
        public DateTime CreatedDateTime { get; set; }

        [JsonProperty("createdBy")]
        public string CreatedBy { get; set; }

        [JsonProperty("lastModified")]
        public DateTime? LastModified { get; set; }

        [JsonProperty("modifiedBy")]
        public string ModifiedBy { get; set; }

        [JsonProperty("tags")]
        public string Tags { get; set; }

        [Required]
        [JsonProperty("code")]
        public string Code { get; set; }

        [JsonProperty("totalSaled")]
        public int TotalSaled { get; set; }

        [JsonProperty("dealPrice")]
        public double? DealPrice { get; set; }

        [JsonProperty("discount")]
        public double Discount { get; set; }

        [JsonProperty("importPrice")]
        public double ImportPrice { get; set; }

        [JsonProperty("material")]
        public string Material { get; set; }

        [JsonProperty("normalPrice")]
        public double NormalPrice { get; set; }

        [JsonProperty("packageCount")]
        public int PackageCount { get; set; }

        [JsonProperty("size")]
        public string Size { get; set; }

        #endregion Models

        #region Views

        [JsonProperty("domain")]
        public string Domain { get { return SioService.GetConfig<string>("Domain", Specificulture); } }

        [JsonProperty("imageUrl")]
        public string ImageUrl
        {
            get
            {
                if (!string.IsNullOrEmpty(Image) && (Image.IndexOf("http") == -1) && Image[0] != '/')
                {
                    return CommonHelper.GetFullPath(new string[] {
                    Domain,  Image
                });
                }
                else
                {
                    return Image;
                }
            }
        }
        [JsonProperty("thumbnailUrl")]
        public string ThumbnailUrl
        {
            get
            {
                if (Thumbnail != null && Thumbnail.IndexOf("http") == -1 && Thumbnail[0] != '/')
                {
                    return CommonHelper.GetFullPath(new string[] {
                    Domain,  Thumbnail
                });
                }
                else
                {
                    return string.IsNullOrEmpty(Thumbnail) ? ImageUrl : Thumbnail;
                }
            }
        }
        [JsonProperty("strPrice")]
        public string StrPrice
        {
            get
            {
                return SioCmsHelper.FormatPrice(Price);
            }
        }

        [JsonProperty("strNormalPrice")]
        public string StrNormalPrice
        {
            get
            {
                return SioCmsHelper.FormatPrice(NormalPrice);
            }
        }

        [JsonProperty("strDealPrice")]
        public string StrDealPrice
        {
            get
            {
                return SioCmsHelper.FormatPrice(DealPrice);
            }
        }

        [JsonProperty("strImportPrice")]
        public string StrImportPrice
        {
            get
            {
                return SioCmsHelper.FormatPrice(ImportPrice);
            }
        }

        [JsonProperty("detailsUrl")]
        public string DetailsUrl { get; set; }

        
        #endregion Views

        #endregion Properties

        #region Contructors

        public ReadListItemViewModel() : base()
        {
        }

        public ReadListItemViewModel(SioProduct model, SioCmsContext _context = null, IDbContextTransaction _transaction = null) : base(model, _context, _transaction)
        {
        }

        #endregion Contructors

        #region Expands

        public static async Task<RepositoryResponse<PaginationModel<ReadListItemViewModel>>> GetModelListByCategoryAsync(
            int categoryId, string specificulture
            , string orderByPropertyName, int direction
            , int? pageSize = 1, int? pageIndex = 0
            , SioCmsContext _context = null, IDbContextTransaction _transaction = null)
        {
            SioCmsContext context = _context ?? new SioCmsContext();
            var transaction = _transaction ?? context.Database.BeginTransaction();
            try
            {
                var query = context.SioPageProduct.Include(ac => ac.SioProduct)
                    .Where(ac =>
                    ac.CategoryId == categoryId && ac.Specificulture == specificulture
                    && ac.Status == (int)SioContentStatus.Published).Select(ac => ac.SioProduct);
                PaginationModel<ReadListItemViewModel> result = await Repository.ParsePagingQueryAsync(
                    query, orderByPropertyName
                    , direction,
                    pageSize, pageIndex, context, transaction
                    );
                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = true,
                    Data = result
                };
            }
            catch (Exception ex) // TODO: Add more specific exeption types instead of Exception only
            {
                Repository.LogErrorMessage(ex);
                if (_transaction == null)
                {
                    //if current transaction is root transaction
                    transaction.Rollback();
                }

                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = false,
                    Data = null,
                    Exception = ex
                };
            }
            finally
            {
                if (_context == null)
                {
                    //if current Context is Root
                    context.Dispose();
                }
            }
        }

        #region Sync

        public static RepositoryResponse<PaginationModel<ReadListItemViewModel>> GetModelListByCategory(
           int categoryId, string specificulture
           , string orderByPropertyName, int direction
           , int? pageSize = 1, int? pageIndex = 0
           , SioCmsContext _context = null, IDbContextTransaction _transaction = null)
        {
            SioCmsContext context = _context ?? new SioCmsContext();
            var transaction = _transaction ?? context.Database.BeginTransaction();
            try
            {
                var query = context.SioPageProduct.Include(ac => ac.SioProduct)
                    .Where(ac =>
                    ac.CategoryId == categoryId && ac.Specificulture == specificulture
                    && ac.Status == (int)SioContentStatus.Published).Select(ac => ac.SioProduct);
                PaginationModel<ReadListItemViewModel> result = Repository.ParsePagingQuery(
                    query, orderByPropertyName
                    , direction,
                    pageSize, pageIndex, context, transaction
                    );
                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = true,
                    Data = result
                };
            }
            catch (Exception ex) // TODO: Add more specific exeption types instead of Exception only
            {
                Repository.LogErrorMessage(ex);
                if (_transaction == null)
                {
                    //if current transaction is root transaction
                    transaction.Rollback();
                }

                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = false,
                    Data = null,
                    Exception = ex
                };
            }
            finally
            {
                if (_context == null)
                {
                    //if current Context is Root
                    context.Dispose();
                }
            }
        }

        public static RepositoryResponse<PaginationModel<ReadListItemViewModel>> GetModelListByModule(
          int ModuleId, string specificulture
          , string orderByPropertyName, int direction
          , int? pageSize = 1, int? pageIndex = 0
          , SioCmsContext _context = null, IDbContextTransaction _transaction = null)
        {
            SioCmsContext context = _context ?? new SioCmsContext();
            var transaction = _transaction ?? context.Database.BeginTransaction();
            try
            {
                var query = context.SioModuleProduct.Include(ac => ac.SioProduct)
                    .Where(ac =>
                    ac.ModuleId == ModuleId && ac.Specificulture == specificulture
                    && (ac.Status == (int)SioContentStatus.Published || ac.Status == (int)SioContentStatus.Preview)).Select(ac => ac.SioProduct);
                PaginationModel<ReadListItemViewModel> result = Repository.ParsePagingQuery(
                    query, orderByPropertyName
                    , direction,
                    pageSize, pageIndex, context, transaction
                    );
                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = true,
                    Data = result
                };
            }
            catch (Exception ex) // TODO: Add more specific exeption types instead of Exception only
            {
                Repository.LogErrorMessage(ex);
                if (_transaction == null)
                {
                    //if current transaction is root transaction
                    transaction.Rollback();
                }

                return new RepositoryResponse<PaginationModel<ReadListItemViewModel>>()
                {
                    IsSucceed = false,
                    Data = null,
                    Exception = ex
                };
            }
            finally
            {
                if (_context == null)
                {
                    //if current Context is Root
                    context.Dispose();
                }
            }
        }

        #endregion Sync

        #endregion Expands

        
    }
}
